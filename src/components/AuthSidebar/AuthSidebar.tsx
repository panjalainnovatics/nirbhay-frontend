/* eslint-disable jsx-a11y/alt-text */
import authImage from "../../assets/auth-image.svg";
import "../AuthLayout/AuthLayout.scss";

const AuthSidebar = () => {
  return (
    <div className="auth-image-container">
      <img className="auth-image" src={authImage}></img>
    </div>
  );
};

export default AuthSidebar;
