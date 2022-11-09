import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { stripeSuccessRequest } from "../actions/stripe";

const StripeSuccess = () => {
  const params = useParams();
  const { auth } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  useEffect(() => {
    stripeSuccessRequest(auth.token, params.itemId).then((res) => {
      if (res.data.success) {
        navigate("/myprofile");
      } else {
        navigate("/stripe/cancel");
      }
    });
  }, [params.itemId]);

  return (
    <div className="container" style={{ flex: "1" }}>
      <div className="col">
        <h2 className="text-center p-5" >
          Payment success.{params.itemId}
        </h2>
      </div>
    </div>
  );
};

export default StripeSuccess;
