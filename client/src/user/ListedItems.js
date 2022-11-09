import MyProfileNav from "../components/MyProfileNav";
import AccountDetails from "../components/AccountDetails";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createConnectAccount } from "../actions/stripe";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { sellerItems, deleteItem } from "../actions/items";
import SmallCard from "../components/SmallCard";

const ListedItems = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadSellersItems();
  }, []);

  const loadSellersItems = async () => {
    let res = await sellerItems(auth.token);

    const reversed = res.data.reverse();
    setItems(reversed);
  };

  const handleItemDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    deleteItem(auth.token, itemId).then((res) => {
      toast.success("Item Deleted");
      loadSellersItems();
    });
  };

  const handleClick = async () => {
    setLoading(true);
    try {
      let res = await createConnectAccount(auth.token);
      console.log(res); //get login link
      window.location.href = res.data;
    } catch (err) {
      console.log(err);
      toast.error("Stripe connect failed.Try again.");
      setLoading(false);
    }
  };

  const connected = () => (
    <div className="container-fluid" style={{ flex: "1" }}>
      <div className="row">
        <div className="col-md-10">
          <h2 style={{ paddingLeft: "15px" }}>Your items</h2>
        </div>
        <div className="col-md-2">
          <Link
            className="btn"
            to="/items/new"
            style={{ backgroundColor: "#e24a18", color: "white" }}
          >
            + Add new
          </Link>
        </div>
        <div
          className="row"
          style={{ paddingRight: "30px", paddingLeft: "20px" }}
        >
          <br />
          <br />
          {items.map((it) => (
            <SmallCard
              key={it._id}
              it={it}
              showViewMoreButton={false}
              owner={true}
              handleItemDelete={handleItemDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );

  const notConnected = () => (
    <div className="container-fluid" style={{ flex: "1" }}>
      <div className="row">
        <div className="col-md-6 offset-md-3 text-center">
          <div className="p-5 pointer">
            <h4>Connect with stripe to post your items</h4>
            <button
              disabled={loading}
              onClick={handleClick}
              className="btn mb-3"
              style={{backgroundColor:"#e24a18", color:"white"}}
            >
              {loading ? "Processing..." : "Setup payouts"}
            </button>
            <p className="text-muted">
              <small>
                You will be redirected to stripe to complete onboarding process
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div
        className="container-fluid p-5"
        style={{ background: "linear-gradient( 0deg,#031c0c, #57705E)" }}
      >
        <AccountDetails />
      </div>

      <div className="container-fluid p-4">
        <MyProfileNav />
      </div>

      {auth &&
      auth.user &&
      auth.user.stripe_seller &&
      auth.user.stripe_seller.charges_enabled
        ? connected()
        : notConnected()}
      <br />
    </>
  );
};

export default ListedItems;
