import "./Login.scss";
import {
  InputAdornment,
  TextField,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import Api from "../../services/Axios/ApiInstance";
import { useFormik } from "formik";
import { useState, useEffect } from "react";
import IconRenderer from "../../components/Icon/IconRenderer";
import { TibButton } from "../../components/TIbbutton/Tibbutton";
import { useNavigate } from "react-router-dom";
import { errorToast, successToast } from "../../util/util";
import { RegistrationModal } from "../../services/Interface/RegistrationModal";

const Registration = () => {
  const api = new Api();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [sameAsMobile, setSameAsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = (values: RegistrationModal) => {
    const errors: RegistrationModal = {};

    if (!values.email) {
      errors.email = "Please enter an email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
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

    if (!values.mobile_number) {
      errors.mobile_number = "Please enter a mobile number";
    } else if (!/^\d{10}$/.test(values.mobile_number)) {
      errors.mobile_number = "Please enter a valid mobile number";
    }

    if (!values.whatsapp_number) {
      errors.whatsapp_number = "Please enter a whatsapp number";
    } else if (!/^\d{10}$/.test(values.whatsapp_number)) {
      errors.whatsapp_number = "Please enter a valid whatsapp number";
    }

    if (!values.first_name) {
      errors.first_name = "Please enter a first name";
    }

    if (!values.last_name) {
      errors.last_name = "Please enter a last name";
    }

    if (!values.gender) {
      errors.gender = "Please select a gender";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      mobile_number: "",
      whatsapp_number: "",
      first_name: "",
      last_name: "",
      confirmPassword: "",
      gender: "",
    },
    validate,

    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        email: values.email.toLowerCase(),
        password: values.password,
        confirm_password: values.confirmPassword,
        first_name: values.first_name,
        last_name: values.last_name,
        gender: values.gender,
        whatsapp_mobile_no: values.whatsapp_number,
        mobile_no: values.mobile_number,
      };

      try {
        const res = await api.post("/customer/add", payload);
        successToast("Customer added successfully ");
        localStorage.setItem("access_token", res.data.access_token);
        localStorage.setItem("refresh_token", res.data.refresh_token);
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

  useEffect(() => {
    if (sameAsMobile) {
      formik.setFieldValue("whatsapp_number", formik.values.mobile_number);
    }
  }, [sameAsMobile, formik.values.mobile_number]);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleBackClick = () => {
    navigate("/auth/forget-password");
  };
  const handleSameAsMobileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSameAsMobile(event.target.checked);
  };

  return (
    <div className="auth-left-container">
      <div className="login-r-page-form-container">
        <div className="login-r-page-form-header">
          <div className="login-r-page-header-subheader">Register</div>
          <div className="login-r-page-header-text">Welcome ✌️</div>
        </div>
        <form onSubmit={formik.handleSubmit} className="login-r-from">
          <div className="input-row">
            <div className="login-r-input-field-container">
              <div className="login-r-input-field-label">First Name*</div>
              <TextField
                variant="outlined"
                className="input-field mt-xs"
                InputProps={{
                  className: "textField",
                }}
                id="first_name"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
              />
            </div>
            <div className="login-r-input-field-container">
              <div className="login-r-input-field-label">Last Name*</div>
              <TextField
                variant="outlined"
                className="input-field mt-xs"
                InputProps={{
                  className: "textField",
                }}
                id="last_name"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                helperText={formik.touched.last_name && formik.errors.last_name}
              />
            </div>
          </div>
          <div className="input-row">
            <div className="login-r-input-field-container">
              <div className="login-r-input-field-label">Mobile Number*</div>
              <TextField
                variant="outlined"
                className="input-field mt-xs"
                InputProps={{
                  className: "textField",
                }}
                id="mobile_number"
                name="mobile_number"
                value={formik.values.mobile_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.mobile_number &&
                  Boolean(formik.errors.mobile_number)
                }
                helperText={
                  formik.touched.mobile_number && formik.errors.mobile_number
                }
              />
            </div>
            <div className="login-r-input-field-container">
              <div className="login-r-input-field-label">WhatsApp Number*</div>
              <TextField
                variant="outlined"
                className="input-field mt-xs"
                InputProps={{
                  className: "textField",
                }}
                id="whatsapp_number"
                name="whatsapp_number"
                value={formik.values.whatsapp_number}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.whatsapp_number &&
                  Boolean(formik.errors.whatsapp_number)
                }
                helperText={
                  formik.touched.whatsapp_number &&
                  formik.errors.whatsapp_number
                }
                disabled={sameAsMobile}
              />
            </div>
          </div>
          <div>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sameAsMobile}
                  onChange={handleSameAsMobileChange}
                  name="sameAsMobile"
                  color="primary"
                />
              }
              label="WhatsApp number is same as mobile number"
            />
          </div>
          <div className="input-row">
            <div className="login-r-input-field-container">
              <div className="login-r-input-field-label">Email*</div>
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
            <div className="login-r-input-field-container">
              <div className="login-r-input-field-label">Gender*</div>
              <TextField
                variant="outlined"
                className="input-field mt-xs"
                InputProps={{
                  className: "textField",
                }}
                select
                id="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="OTHER">Other</MenuItem>
              </TextField>
            </div>
          </div>
          <div className="login-r-input-field-container">
            <div className="login-r-input-field-label">Password*</div>
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
          <div className="login-r-input-field-container">
            <div className="login-r-input-field-label">Confirm Password*</div>
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
          <div
            className="login-r-link-text"
            onClick={() => navigate("/auth/login")}
          >
            Already registered? <span>Login</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
