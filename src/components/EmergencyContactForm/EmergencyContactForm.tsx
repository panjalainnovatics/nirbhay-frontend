// import "./EmergencyContactForm.scss";
// import { Button, CircularProgress, MenuItem, TextField } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import { useFormik } from "formik";
// import { EmergencyFormModal } from "../../services/Interface/EmergencyContactModal";
// import { useContext, useEffect, useState } from "react";
// import { BreadCrumbContext } from "../../services/Context/Context";
// import Api from "../../services/Axios/ApiInstance";
// import { GadgetModal } from "../../services/Interface/GadgetModal";
// import { errorToast, successToast } from "../../util/util";

// const validate = (values: EmergencyFormModal) => {
//   const errors: EmergencyFormModal = {};

//   if (!values.email) {
//     errors.email = "Please enter an email";
//   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = "Invalid email address";
//   }

//   if (!values.mobilenumber) {
//     errors.mobilenumber = "Please enter a mobile number";
//   } else if (!/^\d{10}$/.test(values.mobilenumber)) {
//     errors.mobilenumber = "Please enter a valid mobile number";
//   }

//   if (!values.firstname) {
//     errors.firstname = "Please enter a first name";
//   }

//   if (!values.lastname) {
//     errors.lastname = "Please enter a last name";
//   }
//   if (!values.whatsappnumber) {
//     errors.whatsappnumber = "Please enter a WhatsApp number";
//   }

//   if (!values.gadget) {
//     errors.gadget = "Please select gadget";
//   }
//   return errors;
// };
// const EmergencyContactForm = () => {
//   const header = {
//     Icon: "ContactIconBlack",
//     title: "Emergency Contact",
//     breadCrumbsData: [
//       { label: "Emergency Contact", url: "/emergency-contact" },
//       { label: "Emergency Contact Form", url: "" },
//     ],
//   };
//   const api = new Api();
//   const navigate = useNavigate();
//   const queryString = window.location.search;

//   // Parse the query string using URLSearchParams
//   const urlParams = new URLSearchParams(queryString);

//   // Get the Id value
//   const IdValue = urlParams.get("id");
//   const [gadgetList, setgadgetList] = useState<GadgetModal[]>([]);
//   const [loading, setLoading] = useState(false);
//   const BreadCrumbs = useContext(BreadCrumbContext);
//   useEffect(() => {
//     BreadCrumbs.setBreadCrumb(header);
//   }, []);
//   useEffect(() => {
//     if (IdValue) {
//       getEmergencyContact();
//     }
//     gadgetListAPi();
//   }, []);
//   /**
//    * Api call for get emergency contact details for update emergency contact
//    */
//   const getEmergencyContact = async () => {
//     const params = {
//       uuid: IdValue,
//     };
//     try {
//       const customer = await api.get(`/emergency_contact/uuid`, true, params);
//       formik.setFieldValue("email", customer.data.data.email);
//       formik.setFieldValue("firstname", customer.data.data.first_name);
//       formik.setFieldValue("lastname", customer.data.data.last_name);
//       formik.setFieldValue(
//         "whatsappnumber",
//         customer.data.data.whatsapp_mobile_no
//       );
//       formik.setFieldValue("mobilenumber", customer.data.data.mobile_no);
//       formik.setFieldValue("gadget", customer.data.data.gadget_uuid);
//     } catch (error) {}
//   };
//   const gadgetListAPi = async () => {
//     try {
//       const params = {
//         per_page: 10,
//       };
//       const res = await api.get("/gadget/list", true, params);
//       console.log(res);

//       setgadgetList(res.data.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//       mobilenumber: "",
//       firstname: "",
//       lastname: "",
//       whatsappnumber: "",
//       gadget: "",
//     },
//     validate,

//     onSubmit: async (values) => {
//       setLoading(true);
//       if (IdValue) {
//         const payload = {
//           emergency_contact_uuid: IdValue,
//           gadget_uuid: values.gadget,
//           email: values.email,
//           first_name: values.firstname,
//           last_name: values.lastname,
//           mobile_no: values.mobilenumber,
//           whatsapp_mobile_no: values.whatsappnumber,
//         };

//         try {
//           const res = await api.put("/emergency_contact/update", payload, true);
//           successToast("Contact updated successfully ");
//           navigate("/emergency-contact");
//           setLoading(false);
//         } catch (error: any) {
//           errorToast(
//             error?.response?.data?.message
//               ? error?.response?.data?.message
//               : "Opps something went wrong !!"
//           );
//           setLoading(false);
//         }
//       } else {
//         const payload = {
//           gadget_uuid: values.gadget,
//           email: values.email,
//           first_name: values.firstname,
//           last_name: values.lastname,
//           mobile_no: values.mobilenumber,
//           whatsapp_mobile_no: values.whatsappnumber,
//         };

//         try {
//           const res = await api.post("/emergency_contact/add", payload, true);
//           successToast("Emergency contact added successfully ");
//           navigate("/emergency-contact");
//           setLoading(false);
//         } catch (error: any) {
//           errorToast(
//             error?.response?.data?.message
//               ? error?.response?.data?.message
//               : "Opps something went wrong !!"
//           );
//           setLoading(false);
//         }
//       }
//     },
//   });
//   return (
//     <div>
//       {" "}
//       <div>
//         <form onSubmit={formik.handleSubmit}>
//           <div className="mt-2">
//             <div className="form-container">
//               <div className="form-container-header">
//                 {IdValue ? "Update Emergency Contact" : `Add Emergency Contact`}
//               </div>
//               <div className="input-field-container">
//                 <div className="input-row-container">
//                   <TextField
//                     className="input-field-50"
//                     id="firstname"
//                     name="firstname"
//                     label="First Name*"
//                     autoComplete="off"
//                     value={formik.values.firstname}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={
//                       formik.touched.firstname &&
//                       Boolean(formik.errors.firstname)
//                     }
//                     helperText={
//                       formik.touched.firstname && formik.errors.firstname
//                     }
//                   />

//                   <TextField
//                     className="input-field-50"
//                     id="lastname"
//                     name="lastname"
//                     label="Last Name*"
//                     autoComplete="off"
//                     value={formik.values.lastname}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={
//                       formik.touched.lastname && Boolean(formik.errors.lastname)
//                     }
//                     helperText={
//                       formik.touched.lastname && formik.errors.lastname
//                     }
//                   />
//                 </div>

//                 <div className="input-row-container">
//                   <TextField
//                     className="input-field-50"
//                     id="email"
//                     name="email"
//                     label="Email*"
//                     autoComplete="off"
//                     value={formik.values.email}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={formik.touched.email && Boolean(formik.errors.email)}
//                     helperText={formik.touched.email && formik.errors.email}
//                   />
//                   <TextField
//                     className="input-field-50"
//                     id="mobilenumber"
//                     name="mobilenumber"
//                     label="Mobile Number*"
//                     autoComplete="off"
//                     value={formik.values.mobilenumber}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={
//                       formik.touched.mobilenumber &&
//                       Boolean(formik.errors.mobilenumber)
//                     }
//                     helperText={
//                       formik.touched.mobilenumber && formik.errors.mobilenumber
//                     }
//                   />
//                 </div>

//                 <div className="input-row-container">
//                   <TextField
//                     className="input-field-50"
//                     id="whatsappnumber"
//                     name="whatsappnumber"
//                     label="WhatsApp number*"
//                     autoComplete="off"
//                     value={formik.values.whatsappnumber}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={
//                       formik.touched.whatsappnumber &&
//                       Boolean(formik.errors.whatsappnumber)
//                     }
//                     helperText={
//                       formik.touched.whatsappnumber &&
//                       formik.errors.whatsappnumber
//                     }
//                   />

//                   <TextField
//                     className="input-field-50"
//                     select
//                     id="gadget"
//                     name="gadget"
//                     label="Gadget*"
//                     value={formik.values.gadget}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     error={
//                       formik.touched.gadget && Boolean(formik.errors.gadget)
//                     }
//                     helperText={formik.touched.gadget && formik.errors.gadget}
//                   >
//                     {gadgetList && gadgetList.length > 0 ? (
//                       gadgetList.map((data, index) => {
//                         return (
//                           <MenuItem value={data.uuid} key={data.uuid}>
//                             {data?.name ? data?.name : "-"}
//                           </MenuItem>
//                         );
//                       })
//                     ) : (
//                       <MenuItem value="No Data Available" key="1" disabled>
//                         No gadget available
//                       </MenuItem>
//                     )}
//                   </TextField>
//                 </div>
//               </div>
//             </div>
//             <div className="button-container">
//               {/* <div>
//                 <Button
//                   type="button"
//                   className="secondary-button"
//                   onClick={() => navigate("/emergency-contact")}
//                 >
//                   Cancel
//                 </Button>
//               </div> */}
//               <div>
//                 <Button type="submit" className="default-btn">
//                   {loading ? (
//                     <>
//                       <CircularProgress
//                         className="button-loader"
//                         size={14}
//                         color="inherit"
//                       />
//                       {IdValue ? "Updating..." : "Saving ..."}
//                     </>
//                   ) : IdValue ? (
//                     "Update"
//                   ) : (
//                     "Save"
//                   )}
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EmergencyContactForm;
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  MenuItem,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { EmergencyFormModal } from "../../services/Interface/EmergencyContactModal";
import { BreadCrumbContext } from "../../services/Context/Context";
import Api from "../../services/Axios/ApiInstance";
import { GadgetModal } from "../../services/Interface/GadgetModal";
import { errorToast, successToast } from "../../util/util";
import "./EmergencyContactForm.scss";

const validate = (values: EmergencyFormModal) => {
  const errors: EmergencyFormModal = {};

  if (
    values?.email &&
    !/^[A-Z0-9_%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
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
    errors.whatsappnumber = "Please enter a WhatsApp number";
  }

  if (!values.gadget) {
    errors.gadget = "Please select gadget";
  }
  return errors;
};

const EmergencyContactForm = () => {
  const header = {
    Icon: "ContactIconBlack",
    title: "Emergency Contact",
    breadCrumbsData: [
      { label: "Emergency Contact", url: "/emergency-contact" },
      { label: "Emergency Contact Form", url: "" },
    ],
  };
  const api = new Api();
  const navigate = useNavigate();
  const queryString = window.location.search;

  // Parse the query string using URLSearchParams
  const urlParams = new URLSearchParams(queryString);

  // Get the Id value
  const IdValue = urlParams.get("id");
  const [gadgetList, setgadgetList] = useState<GadgetModal[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSameAsMobile, setIsSameAsMobile] = useState(false);
  const BreadCrumbs = useContext(BreadCrumbContext);
  useEffect(() => {
    BreadCrumbs.setBreadCrumb(header);
  }, []);
  useEffect(() => {
    if (IdValue) {
      getEmergencyContact();
    }
    gadgetListAPi();
  }, []);
  /**
   * Api call for get emergency contact details for update emergency contact
   */
  const getEmergencyContact = async () => {
    const params = {
      uuid: IdValue,
    };
    try {
      const customer = await api.get(`/emergency_contact/uuid`, true, params);
      formik.setFieldValue("email", customer.data.data.email);
      formik.setFieldValue("firstname", customer.data.data.first_name);
      formik.setFieldValue("lastname", customer.data.data.last_name);
      formik.setFieldValue(
        "whatsappnumber",
        customer.data.data.whatsapp_mobile_no
      );
      formik.setFieldValue("mobilenumber", customer.data.data.mobile_no);
      formik.setFieldValue("gadget", customer.data.data.gadget_uuid);
    } catch (error) {}
  };
  const gadgetListAPi = async () => {
    try {
      const params = {
        // per_page: 10,
        dropdown: true,
      };
      const res = await api.get("/gadget/list", true, params);
      console.log(res);

      setgadgetList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      mobilenumber: "",
      firstname: "",
      lastname: "",
      whatsappnumber: "",
      gadget: "",
    },
    validate,
    onSubmit: async (values) => {
      setLoading(true);
      const payload = {
        gadget_uuid: values.gadget,
        email: values.email ? values.email?.toLowerCase() : null,
        first_name: values.firstname,
        last_name: values.lastname,
        mobile_no: values.mobilenumber,
        whatsapp_mobile_no: values.whatsappnumber,
      };
      const Updatepayload = {
        gadget_uuid: values.gadget,
        email: values.email ? values.email?.toLowerCase() : null,
        first_name: values.firstname,
        last_name: values.lastname,
        mobile_no: values.mobilenumber,
        whatsapp_mobile_no: values.whatsappnumber,
        emergency_contact_uuid: IdValue,
      };

      try {
        if (IdValue) {
          // payload.emergency_contact_uuid = IdValue;
          await api.put("/emergency_contact/update", Updatepayload, true);
          successToast("Contact updated successfully");
        } else {
          await api.post("/emergency_contact/add", payload, true);
          successToast("Emergency contact added successfully");
        }
        navigate("/emergency-contact");
      } catch (error: any) {
        errorToast(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Oops something went wrong !!"
        );
      } finally {
        setLoading(false);
      }
    },
  });

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
              {IdValue ? "Update Emergency Contact" : "Add Emergency Contact"}
            </div>
            <div className="input-field-container">
              <div className="input-row-container">
                <TextField
                  className="input-field-50"
                  id="firstname"
                  name="firstname"
                  label="First Name*"
                  autoComplete="off"
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
                  autoComplete="off"
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
                    label="Email"
                    autoComplete="off"
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
                    autoComplete="off"
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
                  label="WhatsApp Number*"
                  autoComplete="off"
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
                  className="input-field-50"
                  select
                  id="gadget"
                  name="gadget"
                  label="Gadget*"
                  value={formik.values.gadget}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.gadget && Boolean(formik.errors.gadget)}
                  helperText={formik.touched.gadget && formik.errors.gadget}
                >
                  {gadgetList && gadgetList.length > 0 ? (
                    gadgetList.map((data) => (
                      <MenuItem value={data.uuid} key={data.uuid}>
                        {data?.name || "-"}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem value="No Data Available" key="1" disabled>
                      No gadget available
                    </MenuItem>
                  )}
                </TextField>
              </div>
            </div>
          </div>
          <div className="button-container">
            <div>
              <Button type="submit" className="default-btn">
                {loading ? (
                  <>
                    <CircularProgress
                      className="button-loader"
                      size={14}
                      color="inherit"
                    />
                    {IdValue ? "Updating..." : "Saving..."}
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

export default EmergencyContactForm;
