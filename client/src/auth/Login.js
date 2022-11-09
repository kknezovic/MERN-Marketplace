import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await login({ email, password });

      if (res.data) {
        console.log("SAVE USER RES IN REDUX AND LOCAL STORAGE THEN REDIRECT");
      }
      //save local storage
      window.localStorage.setItem("auth", JSON.stringify(res.data));
      //save redux
      dispatch({
        type: "LOGGED_IN_USER",
        payload: res.data,
      });
      navigate("/myprofile");
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  return (
    <>
      <div
        className="container-fluid p-5 text-center"
        style={{ background: "linear-gradient( 0deg,#031c0c, #57705E)" }}
      >
        <h1 style={{ color: "white" }}>Login</h1>
      </div>

      <div className="container" style={{ flex: "1" }}>
        <div className="row">
          <div
            className="col-md-6 offset-md-3"
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
          >
            <LoginForm
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              handleSubmit={handleSubmit}
            />
            <br />
            <Link className="nav-link text-primary" to="/register">
              Don't have an account? Register here.
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
