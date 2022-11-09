import { useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { getAccountStatus } from "../actions/stripe";
import { updateUserInLocalStorage } from "../actions/auth";

const StripeCallback = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch;

  useEffect(() => {
    if (auth && auth.token) accountStatus();
  }, [auth]);

  const accountStatus = async () => {
    try {
      const res = await getAccountStatus(auth.token);
      //console.log("USSER ACCOUNT STATUS ON STRIPE CALLBACK", res);

      //sad moze update user-a u local storage
      updateUserInLocalStorage(res.data, () => {
        //moze odma i update redux-a
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
      });
      //redirect na /myprofile/seller
      window.location.href = "/myprofile/seller";
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="d-flex justify-content-center p-5" style={{ flex: "1" }}>
      <LoadingOutlined className="display-1 p-5 text-danger" />
    </div>
  );
};

export default StripeCallback;
