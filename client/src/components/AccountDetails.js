import { useSelector } from "react-redux";

const AccountDetails = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  return (
    <div className="d-flex justify-content-around">
      <h3 style={{color:"white"}}>Hello {auth.user.name}!</h3>
    </div>
  );
};

export default AccountDetails;
