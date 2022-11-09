import { read } from "../actions/items";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSessionId } from "../actions/stripe";
import { loadStripe } from "@stripe/stripe-js";
import { soldItem } from "../actions/items";

const ViewItem = () => {
  const [item, setItem] = useState({});
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sold, setSold] = useState(false);

  const params = useParams();
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    loadSellerItem();
  }, []);

  useEffect(() => {
    soldItem(params.itemId).then((res) => {
      if (res.data.length > 0) setSold(true);
    });
  }, []);

  const loadSellerItem = async () => {
    let res = await read(params.itemId);
    //console.log(res);
    setItem(res.data);
    setImage(`${process.env.REACT_APP_API}/item/image/${res.data._id}`);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!auth) navigate("/login");

    let res = await getSessionId(auth.token, params.itemId);
    //console.log("get session id:",res.data.sessiondId)

    const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
    stripe
      .redirectToCheckout({
        sessionId: res.data.sessiondId,
      })
      .then((result) => console.log(result));
  };

  return (
    <>
      <div
        className="container-fluid p-5 text-center"
        style={{ background: "linear-gradient( 0deg,#031c0c, #57705E)" }}
      >
        <h2 style={{ color: "white" }}>{item.title}</h2>
      </div>
      <div className="container-fluid" style={{flex:"1"}}>
        <br />
        <div className="row">
          <div className="col-md-4">
            <br />
            <img src={image} alt={item.title} className="img img-fluid" />
          </div>
          <div
            className="col-md-6"
            style={{ paddingLeft: "35px", paddingRight: "35px" }}
          >
            <br />
            <b style={{ fontSize: "16px" }}>{item.content}</b>
            <p
              className="mt-3"
              style={{ color: "#009E4F", fontWeight: "bold", fontSize: "21px" }}
            >
              {item.price} HRK
            </p>
            <span
              className="float-right"
              style={{ color: "#e24a18", fontWeight: "500", fontSize: "16px" }}
            >
              Category: {item.category}
            </span>
            <br />
            <span
              className="float-right"
              style={{ color: "#e24a18", fontWeight: "500", fontSize: "16px" }}
            >
              Condition: {item.condition}
            </span>
            <br />
            <br />
            <i style={{ fontSize: "16px" }}>
              Posted by: {item.postedBy && item.postedBy.name}
            </i>
            <br />
            <button
              onClick={handleClick}
              className="btn btn-block btn-lg btn-primary mt-3"
              disabled={loading || sold}
              style={{ backgroundColor: "#e24a18", border: "#e24a18" }}
            >
              {loading
                ? "Loading..."
                : sold
                ? "SOLD"
                : auth && auth.token
                ? "Buy Now"
                : "Login to Buy"}
            </button>
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewItem;
