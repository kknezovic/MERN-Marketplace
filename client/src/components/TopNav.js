import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import marketplaceLogo from "../marketplace/marketplace.png";

const TopNav = () => {
  const { auth } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    window.localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <div
      className="nav d-flex justify-content-between"
      style={{ backgroundColor: "#031c0c", height: "50px" }}
    >
      <div className="logo" style={{ height: "50px" }}>
        <Link
          className="nav-link"
          to="/"
          style={{ color: "white", fontSize: "20px" }}
        >
          <img
            src={marketplaceLogo}
            alt="Marketplace Logo"
            style={{
              height: "45px",
              paddingBottom: "7px",
              borderRadius: "10px",
            }}
          />
        </Link>
      </div>
      <div
        className="topNav"
        style={{
          height: "50px",
          width: "60%",
          display: "inherit",
          justifyContent: "space-around",
        }}
      >
        <Link
          className="nav-link home"
          to="/"
          style={{ color: "white", fontSize: "20px" }}
        >
          Home
        </Link>
        {auth !== null && (
          <Link
            className="nav-link myProfile"
            to="/myprofile"
            style={{ color: "white", fontSize: "20px" }}
          >
            My Profile
          </Link>
        )}
        {auth !== null && (
          <a
            className="nav-link pointer"
            onClick={logout}
            style={{ color: "white", fontSize: "20px" }}
          >
            Logout
          </a>
        )}

        {auth == null && (
          <>
            <Link
              className="nav-link"
              to="/register"
              style={{ color: "white", fontSize: "20px" }}
            >
              Register
            </Link>
            <Link
              className="nav-link"
              to="/login"
              style={{ color: "white", fontSize: "20px" }}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default TopNav;
