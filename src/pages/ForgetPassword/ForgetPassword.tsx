import "./ForgetPassword.scss";
import { TextField } from "@mui/material";
import Api from "../../services/Axios/ApiInstance";
import { useFormik } from "formik";
import IconRenderer from "../../components/Icon/IconRenderer";
import { TibButton } from "../../components/TIbbutton/Tibbutton";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../util/util";

interface forgetpasswordObject {
  email?: string;
}

const ForgetPassword = () => {
  const api = new Api();
  const navigate = useNavigate();

  /**
   * Form validations
   * @param {*} values
   * @returns Erorrs
   */
  const validate = (values: forgetpasswordObject) => {
    const errors: forgetpasswordObject = {};

    if (!values.email) {
      errors.email = "Please enter an email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    return errors;
  };

  /**
   *React Formik Hook
   */
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,

    onSubmit: async (values) => {
      try {
        const data = {
          email: values.email.toLowerCase(),
        };
        // Make a POST request using the api.post method
        const res = await api.post("/auth/forgot_password", data);

        // Check if the response contains a message and show a success toast
        if (res && res.message) {
          successToast(res.message);
        }
      } catch (error: any) {
        errorToast(
          error.response ? error.response.data.message : "Something went wrong"
        );
      }
    },
  });

  const handleBackClick = () => {
    navigate("/auth/login");
  };
  return (
    <div className="auth-left-container">
      <div className="forget-password-form-container">
        <div className="forget-password-form-header">
          <div className="forget-password-header-subheader">
            Forget Password
          </div>
          <div className="forget-password-header-text">
            Enter your email to reset your password
          </div>
        </div>
        <form onSubmit={formik.handleSubmit} className="login-from">
          <div className="forget-password-input-field-caontainer ">
            <div className="forget-password-input-field-label">Email*</div>
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
          <div className="button-container">
            <TibButton type="submit" className="default-btn">
              Send
            </TibButton>
          </div>
        </form>
        <div className="button-container ">
          <TibButton
            type="submit"
            className="text-button w-100"
            buttontype="text"
            startIcon={<IconRenderer name="backArrow" />}
            onClick={handleBackClick}
          >
            Sign In
          </TibButton>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
