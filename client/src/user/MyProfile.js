import MyProfileNav from "../components/MyProfileNav";
import AccountDetails from "../components/AccountDetails";
import { Link } from "react-router-dom";
import { userPurchasedItems } from "../actions/items";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import SmallCardPurchased from "../components/SmallCardPurchased";

const MyProfile = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [purchase, setPurchase] = useState([]);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setEmpty(false);
    loadUserPurchasedItems();
  }, []);

  const loadUserPurchasedItems = async () => {
    const res = await userPurchasedItems(auth.token);

    if (res.data.length === 0) setEmpty(true);

    const reversed = res.data.reverse();
    setPurchase(reversed);
  };

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

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2 style={{ paddingLeft: "15px" }}>Your purchased items</h2>
          </div>
          <div className="col-md-2">
            <Link
              className="btn"
              to="/"
              style={{ backgroundColor: "#e24a18", color: "white" }}
            >
              Browse listed items
            </Link>
          </div>
        </div>
      </div>
      {empty ? (
        <h5 style={{ paddingLeft: "30px", fontWeight: "400" }}>
          No purchased items yet
        </h5>
      ) : (
        <br />
      )}
      <div className="row" style={{ margin: "15px", flex: "1" }}>
        {purchase.map((p) => (
          <SmallCardPurchased
            key={p._id}
            item={p.item}
            session={p.session}
            orderedBy={p.orderedBy}
          />
        ))}
      </div>
      <br />
    </>
  );
};

export default MyProfile;
