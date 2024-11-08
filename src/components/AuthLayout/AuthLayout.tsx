import AuthSidebar from "../AuthSidebar/AuthSidebar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-content">
        <Outlet />
      </div>
      <AuthSidebar />
    </div>
  );
};

export default AuthLayout;
