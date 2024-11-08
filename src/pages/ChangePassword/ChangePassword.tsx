import "./ChangePassword.scss";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import Api from "../../services/Axios/ApiInstance";
import { useFormik } from "formik";
import IconRenderer from "../../components/Icon/IconRenderer";
import { TibButton } from "../../components/TIbbutton/Tibbutton";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../util/util";
import { useState } from "react";

interface resetpasswordObject {
  password?: string;
  confirmPassword?: string;
  oldpassword?: string;
}

const ChangePassword = () => {
  const api = new Api();
  const queryString = window.location.search;

  // Parse the query string using URLSearchParams
  const urlParams = new URLSearchParams(queryString);

  // Get the token value
  const tokenValue = urlParams.get("token");

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showoldPassword, setShowoldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  /**
   * Form validations
   * @param {*} values
   * @returns Errors
   */
  const validate = (values: resetpasswordObject) => {
    const errors: resetpasswordObject = {};

    if (!values.oldpassword) {
      errors.oldpassword = "Please enter an old password";
    } else if (!/.{8,}/.test(values.oldpassword!)) {
      errors.oldpassword = "Password must be at least 8 characters long";
    }
    if (!values.password) {
      errors.password = "Please enter a password";
    } else if (!/.{8,}/.test(values.password!)) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please enter a confirm password";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password and confirm password does not match";
    }

    return errors;
  };

  /**
   *React Formik Hook
   */
  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
      oldpassword: "",
    },
    validate,

    onSubmit: async (values) => {
      setLoading(true);
      const data = {
        old_password: values.oldpassword,
        password: values.password,
        confirm_password: values.confirmPassword,
      };
      console.log(data);

      const res = await api
        .post("/auth/change_password", data, true)
        .then((res) => {
          successToast("Password changed successfully");
          localStorage.clear();
          navigate("/auth/login");
          setLoading(false);
        })
        .catch((error) => {
          errorToast(
            error.response
              ? error.response.data.message
              : "Something went wrong"
          );
          setLoading(false);
        });
    },
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleToggleOldPassword = () => {
    setShowoldPassword(!showoldPassword);
  };
  return (
    <div className="auth-left-container">
      <div className="reset-password-form-container">
        <div className="reset-password-form-header">
          <div className="reset-password-header-subheader">Change Password</div>
          {/* <div className="reset-password-header-text">Enter a new password</div> */}
        </div>
        <form onSubmit={formik.handleSubmit} className="login-from">
          <div className="reset-password-input-field-caontainer ">
            <div className="reset-password-input-field-label">
              {" "}
              Old Password*
            </div>
            <TextField
              variant="outlined"
              className="input-field mt-xs"
              InputProps={{
                className: "textField",
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleToggleOldPassword}
                    style={{ cursor: "pointer" }}
                  >
                    <IconRenderer
                      name={showPassword ? "passwordEyeHide" : "passwordEye"}
                      color="black"
                    />
                  </InputAdornment>
                ),
              }}
              id="oldpassword"
              name="oldpassword"
              type={showoldPassword ? "text" : "password"}
              value={formik.values.oldpassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.oldpassword && Boolean(formik.errors.oldpassword)
              }
              helperText={
                formik.touched.oldpassword && formik.errors.oldpassword
              }
            />
          </div>
          <div className="reset-password-input-field-caontainer ">
            <div className="reset-password-input-field-label">
              New Password*
            </div>
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
                      color="black"
                    />
                  </InputAdornment>
                ),
              }}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </div>

          <div className="reset-password-input-field-caontainer ">
            <div className="reset-password-input-field-label">
              Confirm new password*
            </div>
            <TextField
              variant="outlined"
              className="input-field mt-xs"
              InputProps={{
                className: "textField",
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={handleToggleConfirmPassword}
                    style={{ cursor: "pointer" }}
                  >
                    <IconRenderer
                      name={
                        showConfirmPassword ? "passwordEyeHide" : "passwordEye"
                      }
                      color="black"
                    />
                  </InputAdornment>
                ),
              }}
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
            />
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
                  Submitting ...
                </>
              ) : (
                "Submit"
              )}
            </TibButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
