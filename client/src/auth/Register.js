import { useState } from "react";
import RegisterForm from "../components/RegisterForm";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { register } from "../actions/auth";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        name,
        email,
        password,
      });
      console.log("REGISTER USER-->", res);
      toast.success("Register success.");
      navigate("/login");
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
        <h1 style={{ color: "white" }}>Register</h1>
      </div>
      <div className="container" style={{ flex: "1" }}>
        <div className="row">
          <div
            className="col-md-6 offset-md-3"
            style={{ paddingLeft: "40px", paddingRight: "40px" }}
          >
            <RegisterForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
