import MyProfileNav from "../components/MyProfileNav";
import AccountDetails from "../components/AccountDetails";
import { useSelector } from "react-redux";
import { getAccountBalance } from "../actions/stripe";
import { useEffect, useState } from "react";
import { currencyFormatter } from "../actions/auth";

const AccountBalance = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    getAccountBalance(auth.token).then((res) => {
      setBalance(res.data);
    });
  }, []);

  const connected = () => (
    <div className="container-fluid" style={{ flex: "1" }}>
      <h2 style={{ paddingLeft: "15px" }}>
        Your current balance:{" "}
        {balance &&
          balance.pending &&
          balance.pending.map((ba, i) => (
            <span key={i}>{currencyFormatter(ba)}</span>
          ))}
      </h2>
    </div>
  );

  const notConnected = () => (
    <div className="container-fluid" style={{ flex: "1" }}>
      <h2 style={{ marginLeft: "15px" }}>
        Connect with stripe and start selling
      </h2>
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
    </>
  );
};

export default AccountBalance;
