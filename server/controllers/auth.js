import User from "../models/user";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6)
      return res
        .status(400)
        .send("Password is required and should be min 6 characters long");
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");

    //registracija
    const user = new User(req.body);
    await user.save();
    console.log("USER CREATED", user);
    return res.json({ user });
  } catch (err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //provjera jel postoji
    let user = await User.findOne({ email }).exec();
    console.log("User exist", user);
    if (!user) return res.status(400).send("User with that email not found");

    //usporedba lozinke
    user.comparePassword(password, (err, match) => {
      console.log("Compare password in Login err", err);
      if (!match || err) return res.status(400).send("Wrong password");

      //generiranje tokena i vraćanje korisniku(istice za 2tjedna)
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "30w",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("Error. Sign in failed.");
  }
};
