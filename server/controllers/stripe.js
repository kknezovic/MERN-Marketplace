import User from "../models/user";
import Item from "../models/item";
import Order from "../models/order";
import Stripe from "stripe";
import queryString from "query-string";

const stripe = Stripe(process.env.STRIPE_SECRET);

export const createConnectAccount = async (req, res) => {
  //nac user-a u DB
  const user = await User.findById(req.auth._id).exec();
  console.log("USER->", user);

  //ako user nema stripe_account_id, stvori ga
  if (!user.stripe_account_id) {
    const account = await stripe.account.create({
      type: "express",
    });
    console.log("ACCOUNT->", account);
    user.stripe_account_id = account.id;
    user.save();
  }
  //stvori login link koji je povezan sa account id-jen logiranog user-a
  let accountLink = await stripe.accountLinks.create({
    account: user.stripe_account_id,
    refresh_url: process.env.STRIPE_REDIRECT_URL,
    return_url: process.env.STRIPE_REDIRECT_URL,
    type: "account_onboarding",
  });
  //generirat link i poslat ga na frontend(u njega ukomponirat email)
  let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
  //console.log("LOGIN LINK", link);
  res.send(link);
};

export const getAccountStatus = async (req, res) => {
  const user = await User.findById(req.auth._id).exec();
  const account = await stripe.accounts.retrieve(user.stripe_account_id);

  const updateUser = await User.findByIdAndUpdate(
    user.id,
    {
      stripe_seller: account,
    },
    { new: true }
  )
    .select("-password")
    .exec();
  res.json(updateUser);
};

export const getAccountBalance = async (req, res) => {
  const user = await User.findById(req.auth._id).exec();
  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: user.stripe_account_id,
    });
    res.json(balance);
  } catch (err) {
    console.log(err);
  }
};

export const stripeSessionId = async (req, res) => {
  const { itemId } = req.body;

  const item = await Item.findById(itemId).populate("postedBy").exec();

  const fee = (item.price * 20) / 100; //20%

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "hrk",
          unit_amount: item.price * 100,
          product_data: {
            name: item.title,
          },
        },
        quantity: 1,
      },
    ],
    payment_intent_data: {
      application_fee_amount: fee * 100, //u lipama
      transfer_data: {
        destination: item.postedBy.stripe_account_id,
      },
    },
    mode: "payment",
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });

  await User.findByIdAndUpdate(req.auth._id, { stripeSession: session }).exec();
  res.send({
    sessiondId: session.id,
  });
};

export const stripeSuccess = async (req, res) => {
  try {
    const { itemId } = req.body;

    const user = await User.findById(req.auth._id).exec();

    if (!user.stripeSession) return;

    const session = await stripe.checkout.sessions.retrieve(
      user.stripeSession.id
    );
    if (session.payment_status === "paid") {
      const orderExist = await Order.findOne({
        "session.id": session.id,
      }).exec();
      if (orderExist) {
        res.json({ success: true });
      } else {
        let newOrder = await new Order({
          item: itemId,
          session,
          orderedBy: user._id,
        }).save();
        await User.findByIdAndUpdate(user._id, {
          $set: { stripeSession: {} },
        });

        res.json({ success: true });
      }
    }
  } catch (err) {
    console.log("STRIPE SUCCESS ERR", err);
  }
};
