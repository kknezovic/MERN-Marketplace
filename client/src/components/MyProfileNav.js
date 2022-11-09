import { Link } from "react-router-dom";

const MyProfileNav = () => {
  const active = window.location.pathname;

  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/myprofile" && "active"}`}
          to="/myprofile"
          style={{ color: "#1d1d35", fontSize: "15px" }}
        >
          Your purchased items
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/myprofile/seller" && "active"}`}
          to="/myprofile/seller"
          style={{ color: "#1d1d35", fontSize: "15px" }}
        >
          Your listed items
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${active === "/account_balance" && "active"}`}
          to="/account_balance"
          style={{ color: "#1d1d35", fontSize: "15px" }}
        >
          Account balance
        </Link>
      </li>
    </ul>
  );
};

export default MyProfileNav;
