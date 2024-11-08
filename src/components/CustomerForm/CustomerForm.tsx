import { useFormik } from "formik";
import "./CustomerForm.scss";
import {
  Button,
  Checkbox,
  CircularProgress,
  FormControlLabel,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { CustomerFormModal } from "../../services/Interface/CustomerModal";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BreadCrumbContext } from "../../services/Context/Context";
import Api from "../../services/Axios/ApiInstance";
import { errorToast, successToast } from "../../util/util";
import IconRenderer from "../Icon/IconRenderer";

const CustomerForm = () => {
  const api = new Api();
  const queryString = window.location.search;

  // Parse the query string using URLSearchParams
  const urlParams = new URLSearchParams(queryString);

  // Get the Id value
  const IdValue = urlParams.get("id");
  const header = {
    Icon: "CustomerIconBlack",
    title: "Customers",
    breadCrumbsData: [
      { label: "Customers", url: "/customer" },
      { label: "Customer Form", url: "" },
    ],
  };
  const BreadCrumbs = useContext(BreadCrumbContext);
  const navigate = useNavigate();
  useEffect(() => {
    BreadCrumbs.setBreadCrumb(header);
    if (IdValue) {
      getCustomer();
    }
  }, []);
  const validate = (values: CustomerFormModal) => {
    const errors: CustomerFormModal = {};

    if (!values.email) {
      errors.email = "Please enter an email";
    } else if (!/^[A-Z0-9_%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }

    if (!values.mobilenumber) {
      errors.mobilenumber = "Please enter a mobile number";
    } else if (!/^\d{10}$/.test(values.mobilenumber)) {
      errors.mobilenumber = "Please enter a valid mobile number";
    }

    if (!values.firstname) {
      errors.firstname = "Please enter a first name";
    } else if (!/^[a-zA-Z]+$/.test(values.firstname)) {
      errors.firstname = "Please enter a valid firstname";
    }

    if (!values.lastname) {
      errors.lastname = "Please enter a last name";
    } else if (!/^[a-zA-Z]+$/.test(values.lastname)) {
      errors.lastname = "Please enter a valid lastname";
    }
    if (!values.whatsappnumber) {
      errors.whatsappnumber = "Please enter a whatsapp number";
    } else if (!/^\d{10}$/.test(values.whatsappnumber)) {
      errors.whatsappnumber = "Please enter a valid whatsapp number";
    }

    if (!values.gender) {
      errors.gender = "Please select a gender";
    }
    if (!values.password && !IdValue) {
      errors.password = "Please enter a password";
    } else if (!/.{8,}/.test(values.password!) && !IdValue) {
      errors.password = "Password must be at least 8 characters long";
    }
    if (!values.confirmPassword && !IdValue) {
      errors.confirmPassword = "Please enter a confirm password";
    } else if (values.password !== values.confirmPassword && !IdValue) {
      errors.confirmPassword = "Password and confirm password does not match";
    }
    return errors;
  };
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSameAsMobile, setIsSameAsMobile] = useState(false);
  const [customerDetails, setCustomerDetails] = useState<any>();
  const formik = useFormik({
    initialValues: {
      email: "",
      mobilenumber: "",
      firstname: "",
      lastname: "",
      whatsappnumber: "",
      notes: "",
      gender: "",
      password: "",
      confirmPassword: "",
    },
    validate,

    onSubmit: async (values) => {
      setLoading(true);
      if (IdValue) {
        const payload = {
          email: values.email?.toLowerCase(),
          first_name: values.firstname,
          last_name: values.lastname,
          gender: values.gender,
          whatsapp_mobile_no: values.whatsappnumber,
          mobile_no: values.mobilenumber,
          customer_uuid: customerDetails?.uuid,
        };

        try {
          const res = await api.put("/customer/update", payload, true);
          successToast("Profile updated successfully ");
          navigate("/customer");
          setLoading(false);
        } catch (error: any) {
          errorToast(
            error?.response?.data?.message
              ? error?.response?.data?.message
              : "Opps something went wrong !!"
          );
          setLoading(false);
        }
      } else {
        const payload = {
          email: values.email?.toLowerCase(),
          password: values.password,
          confirm_password: values.confirmPassword,
          first_name: values.firstname,
          last_name: values.lastname,
          gender: values.gender,
          whatsapp_mobile_no: values.whatsappnumber,
          mobile_no: values.mobilenumber,
        };

        try {
          const res = await api.post("/customer/add", payload);
          successToast("Customer added successfully ");
          navigate("/customer");
          setLoading(false);
        } catch (error: any) {
          errorToast(
            error?.response?.data?.message
              ? error?.response?.data?.message
              : "Opps something went wrong !!"
          );
          setLoading(false);
        }
      }
    },
  });

  /**
   * Api call for get customer details for update customer
   */
  const getCustomer = async () => {
    const params = {
      uuid: IdValue,
    };
    try {
      const customer = await api.get(`/customer/uuid`, true, params);
      setCustomerDetails(customer?.data?.data);
      formik.setFieldValue("email", customer.data.data.email);
      formik.setFieldValue("firstname", customer.data.data.first_name);
      formik.setFieldValue("lastname", customer.data.data.last_name);
      formik.setFieldValue(
        "whatsappnumber",
        customer.data.data.whatsapp_mobile_no
      );
      formik.setFieldValue("mobilenumber", customer.data.data.mobile_no);
      formik.setFieldValue("gender", customer.data.data.gender);
    } catch (error) {}
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsSameAsMobile(event.target.checked);
    if (event.target.checked) {
      formik.setFieldValue("whatsappnumber", formik.values.mobilenumber);
    }
  };

  useEffect(() => {
    if (isSameAsMobile) {
      formik.setFieldValue("whatsappnumber", formik.values.mobilenumber);
    }
  }, [formik.values.mobilenumber, isSameAsMobile]);
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-2">
          <div className="form-container">
            <div className="form-container-header">
              {IdValue ? "Update Customer" : `Add Customer`}
            </div>
            <div className="input-field-container">
              <div className="input-row-container">
                <TextField
                  className="input-field-50"
                  id="firstname"
                  name="firstname"
                  label="First Name*"
                  value={formik.values.firstname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstname && Boolean(formik.errors.firstname)
                  }
                  helperText={
                    formik.touched.firstname && formik.errors.firstname
                  }
                />

                <TextField
                  className="input-field-50"
                  id="lastname"
                  name="lastname"
                  label="Last Name*"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastname && Boolean(formik.errors.lastname)
                  }
                  helperText={formik.touched.lastname && formik.errors.lastname}
                />
              </div>

              <div>
                <div className="input-row-container">
                  <TextField
                    className="input-field-50"
                    id="email"
                    name="email"
                    label="Email*"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <TextField
                    className="input-field-50"
                    id="mobilenumber"
                    name="mobilenumber"
                    label="Mobile Number*"
                    value={formik.values.mobilenumber}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.mobilenumber &&
                      Boolean(formik.errors.mobilenumber)
                    }
                    helperText={
                      formik.touched.mobilenumber && formik.errors.mobilenumber
                    }
                  />
                </div>
                <div className="input-row-container check-num">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isSameAsMobile}
                        onChange={handleCheckboxChange}
                        name="isSameAsMobile"
                        color="primary"
                      />
                    }
                    label="WhatsApp number is same as mobile number"
                  />
                </div>
              </div>
              <div className="input-row-container">
                <TextField
                  className="input-field-50"
                  id="whatsappnumber"
                  name="whatsappnumber"
                  label="WhatsApp number*"
                  value={formik.values.whatsappnumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.whatsappnumber &&
                    Boolean(formik.errors.whatsappnumber)
                  }
                  helperText={
                    formik.touched.whatsappnumber &&
                    formik.errors.whatsappnumber
                  }
                  disabled={isSameAsMobile}
                />
                <TextField
                  variant="outlined"
                  className="input-field-50"
                  InputProps={{
                    className: "textField",
                  }}
                  select
                  id="gender"
                  name="gender"
                  label="Gender*"
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

              {!IdValue && (
                <div className="input-row-container">
                  <TextField
                    className="input-field-50"
                    InputProps={{
                      className: "textField",
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          onClick={handleTogglePassword}
                          style={{ cursor: "pointer" }}
                        >
                          <IconRenderer
                            name={
                              showPassword ? "passwordEyeHide" : "passwordEye"
                            }
                            color="black"
                          />
                        </InputAdornment>
                      ),
                    }}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    label="Password*"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                  <TextField
                    className="input-field-50"
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
                              showConfirmPassword
                                ? "passwordEyeHide"
                                : "passwordEye"
                            }
                            color="black"
                          />
                        </InputAdornment>
                      ),
                    }}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm password*"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.confirmPassword &&
                      Boolean(formik.errors.confirmPassword)
                    }
                    helperText={
                      formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="button-container">
            <div>
              {/* <Button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/customer")}
              >
                Cancel
              </Button> */}
            </div>
            <div>
              <Button type="submit" className="default-btn">
                {loading ? (
                  <>
                    <CircularProgress
                      className="button-loader"
                      size={14}
                      color="inherit"
                    />
                    {IdValue ? "Updating..." : "Saving ..."}
                  </>
                ) : IdValue ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
