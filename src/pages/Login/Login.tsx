import "./Login.scss";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import Api from "../../services/Axios/ApiInstance";
import { useFormik } from "formik";
import { useState } from "react";
import IconRenderer from "../../components/Icon/IconRenderer";
import { TibButton } from "../../components/TIbbutton/Tibbutton";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../util/util";

interface loginObject {
  email?: string;
  password?: string;
}

const Login = () => {
  const api = new Api();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Form validations
   * @param {*} values
   * @returns Erorrs
   */
  const validate = (values: loginObject) => {
    const errors: loginObject = {};

    if (!values.email) {
      errors.email = "Please enter an email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Please enter a password";
    }
    return errors;
  };

  /**
   *React Formik Hook
   */
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,

    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        email: values.email.toLowerCase(),
        password: values.password,
      };
      try {
        const res = await api.post("/auth/login", payload);
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
        successToast("Logged in successfully ");
        navigate("/");
        setLoading(false);
      } catch (error: any) {
        errorToast(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Opps something went wrong !!"
        );
        setLoading(false);
      }
    },
  });

  /**
   * Handles the password visibility toggle.
   */
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleBackClick = () => {
    navigate("/auth/forget-password");
  };
  return (
    <div className="auth-left-container">
      <div className="login-page-form-container">
        <div className="login-page-form-header">
          <div className="login-page-header-subheader">Sign In</div>
          <div className="login-page-header-text">Welcome ✌️</div>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="login-from from-container"
        >
          <div className="login-input-field-caontainer ">
            <div className="login-input-field-label">Email*</div>
            <TextField
              variant="outlined"
              className="input-field mt-xs"
              InputProps={{
                className: "textField",
              }}
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </div>
          <div className="login-input-field-caontainer ">
            <div className="login-input-field-label">Password*</div>
            <TextField
              variant="outlined"
              className="input-field mt-xs"
              InputProps={{
                className: "textField",
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleTogglePassword}
                    style={{ cursor: "pointer" }}
                  >
                    <IconRenderer
                      name={showPassword ? "passwordEyeHide" : "passwordEye"}
                    />
                  </InputAdornment>
                ),
              }}
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>
          <div className="login-link-container ">
            <div></div>
            <div className="button-container ">
              <TibButton
                type="button"
                className="text-button w-100"
                buttontype="text"
                onClick={handleBackClick}
              >
                Forget Password ?
              </TibButton>
            </div>
          </div>
          <div className="button-container">
            <TibButton type="submit" className="default-btn">
              {loading ? (
                <>
                  <CircularProgress
                    className="button-loader"
                    size={14}
                    color="inherit"
                  />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </TibButton>
          </div>
          <div
            className="login-link-text"
            onClick={() => navigate("/auth/registration")}
          >
            Not registered ? <span>Register</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
