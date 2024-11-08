import { useFormik } from "formik";
import "./GadgetForm.scss";
import {
  Autocomplete,
  Button,
  CircularProgress,
  InputAdornment,
  MenuItem,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { BreadCrumbContext } from "../../services/Context/Context";
import Api from "../../services/Axios/ApiInstance";
import { errorToast, successToast } from "../../util/util";
import { GadgetFormModal } from "../../services/Interface/GadgetModal";

const GadgetForm = () => {
  const api = new Api();
  const queryString = window.location.search;

  // Parse the query string using URLSearchParams
  const urlParams = new URLSearchParams(queryString);

  // Get the Id value
  const IdValue = urlParams.get("id");
  const header = {
    Icon: "GadgetIconBlack",
    title: "Gadgets",
    breadCrumbsData: [
      { label: "Gadgets", url: "/gadget" },
      { label: "Gadget Form", url: "" },
    ],
  };
  const BreadCrumbs = useContext(BreadCrumbContext);
  const navigate = useNavigate();
  const [gadgetList, setgadgetList] = useState<any>();
  const [userDataFromLocalStorage, setUserDataFromLocalStorage] =
    useState<any>();
  useEffect(() => {
    BreadCrumbs.setBreadCrumb(header);
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserDataFromLocalStorage(JSON.parse(userData));
    }
    if (IdValue) {
      getGadget();
    }
    getGadgetList();
  }, []);
  const validate = (values: GadgetFormModal) => {
    const errors: GadgetFormModal = {};

    if (!values.mobile_no) {
      errors.mobile_no = "Please enter a gadget number";
    } else if (!/^\d+$/.test(values.mobile_no)) {
      errors.mobile_no = "Please enter a valid gadget number";
    }

    if (!values.imei) {
      errors.imei = "Please enter gadget's IMEI number";
    }

    if (!values.name) {
      errors.name = "Please enter a name";
    }

    // if (!values.notes) {
    //   errors.notes = "Please enter notes";
    // }

    if (!values.customer && isAdmin) {
      errors.customer = "Please select a customer";
    }

    return errors;
  };
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      mobile_no: "",
      imei: "",
      name: "",
      notes: "",
      customer: "",
    },
    validate,

    onSubmit: async (values) => {
      setLoading(true);
      if (IdValue) {
        const payload = {
          gadget_id: Number(values.imei),
          gadget_name: values.name,
          gadget_uuid: IdValue,
          mobile_no: values.mobile_no,
          description: values.notes ? values.notes : null,
        };

        try {
          const res = await api.put("/gadget/update", payload, true);
          successToast("Gadget updated successfully ");
          navigate("/gadget");
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
          gadget_id: Number(values.imei),
          name: values.name,
          customer_uuid: isAdmin
            ? values.customer
            : userDataFromLocalStorage?.uuid,
          mobile_no: values.mobile_no,
          description: values.notes ? values.notes : null,
        };

        try {
          const res = await api.post("/gadget/add", payload, true);
          successToast("Gadget added successfully ");
          navigate("/gadget");
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
   * Api call for get gadget details for update gadget
   */
  const getGadget = async () => {
    const params = {
      uuid: IdValue,
    };
    try {
      const gadget = await api.get(`/gadget/uuid`, true, params);
      formik.setFieldValue("imei", gadget.data.data.gadget_id);
      formik.setFieldValue("name", gadget.data.data.name);
      formik.setFieldValue("mobile_no", gadget.data.data.mobile_no);
      formik.setFieldValue("customer", gadget.data.data.customer_uuid);
      formik.setFieldValue("notes", gadget.data.data.description);
    } catch (error) {}
  };

  /**
   * Api call to get customer List
   */

  const getGadgetList = async () => {
    const params = {
      dropdown: true,
    };
    try {
      const gadgetList = await api.get("/customer/list", true, params);
      setgadgetList(gadgetList.data.data);
    } catch (error) {}
  };
  const userRoles = userDataFromLocalStorage?.role;
  const isAdmin = userRoles?.includes("super_admin");

  console.log(formik.values.customer, "customer");

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-2">
          <div className="form-container">
            <div className="form-container-header">
              {IdValue ? "Update Gadget" : `Add Gadget`}
            </div>
            <div className="input-field-container">
              <div className="input-row-container">
                <TextField
                  className="input-field-50"
                  id="imei"
                  name="imei"
                  label="Gadget IMEI number*"
                  value={formik.values.imei}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.imei && Boolean(formik.errors.imei)}
                  helperText={formik.touched.imei && formik.errors.imei}
                />

                <TextField
                  className="input-field-50"
                  id="name"
                  name="name"
                  label="Gadget Name*"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </div>

              <div className="input-row-container">
                <TextField
                  className="input-field-50"
                  id="mobile_no"
                  name="mobile_no"
                  label="Gadget Number*"
                  value={formik.values.mobile_no}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mobile_no && Boolean(formik.errors.mobile_no)
                  }
                  helperText={
                    formik.touched.mobile_no && formik.errors.mobile_no
                  }
                />
                {/* {isAdmin ? (
                  <TextField
                    variant="outlined"
                    className="input-field-50 customer-list-gadget-form"
                    InputProps={{
                      className: "textField",
                    }}
                    select
                    disabled={IdValue ? true : false}
                    id="customer"
                    name="customer"
                    label="Customer*"
                    value={formik.values.customer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                      formik.touched.customer && Boolean(formik.errors.customer)
                    }
                    helperText={
                      formik.touched.customer && formik.errors.customer
                    }
                  >
                    {gadgetList &&
                      gadgetList.length > 0 &&
                      gadgetList.map((data?: any, index?: number) => {
                        return (
                          <MenuItem value={data?.uuid} key={data?.uuid}>
                            {data?.first_name
                              ? `${data?.first_name} ${data?.last_name}`
                              : ""}
                          </MenuItem>
                        );
                      })}
                  </TextField>
                ) : (
                  <div className="input-field-50 customer-list-gadget-form"></div>
                )}
              </div> */}
                {/* {isAdmin ? (
                  <Autocomplete
                    disablePortal
                    id="customer-autocomplete"
                    className="input-field-50 customer-list-gadget-form"
                    options={
                      gadgetList && gadgetList.length > 0
                        ? gadgetList.map((data: any) => ({
                            label: `${data?.first_name} ${data?.last_name}`,
                            value: data?.uuid,
                          }))
                        : []
                    }
                    getOptionLabel={(option: any) => option.label || ""}
                    sx={{ width: 300 }}
                    disabled={IdValue ? true : false}
                    value={formik.values.customer}
                    onChange={(event, newValue: any) => {
                      formik.setFieldValue(
                        "customer",
                        newValue ? newValue.value : ""
                      );
                    }}
                    onBlur={formik.handleBlur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer*"
                        error={
                          formik.touched.customer &&
                          Boolean(formik.errors.customer)
                        }
                        helperText={
                          formik.touched.customer && formik.errors.customer
                        }
                      />
                    )}
                  />
                ) : (
                  <div className="input-field-50 customer-list-gadget-form"></div>
                )} */}
                {isAdmin ? (
                  <Autocomplete
                    disablePortal
                    id="customer-autocomplete"
                    className="input-field-50 customer-list-gadget-form"
                    options={
                      gadgetList && gadgetList.length > 0
                        ? gadgetList.map((data: any) => ({
                            label: `${data?.first_name} ${data?.last_name} (${data?.whatsapp_mobile_no})`,
                            value: data?.uuid,
                          }))
                        : []
                    }
                    getOptionLabel={(option: any) => option.label || ""}
                    sx={{ width: 300 }}
                    disabled={IdValue ? true : false}
                    // Find the object in gadgetList that matches formik.values.customer
                    value={
                      gadgetList && gadgetList.length > 0
                        ? gadgetList
                            .map((data: any) => ({
                              label: `${data?.first_name} ${data?.last_name}`,
                              value: data?.uuid,
                            }))
                            .find(
                              (option: any) =>
                                option.value === formik.values.customer
                            ) || null
                        : null
                    }
                    onChange={(event, newValue: any) => {
                      formik.setFieldValue(
                        "customer",
                        newValue ? newValue.value : ""
                      );
                    }}
                    onBlur={formik.handleBlur}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Customer*"
                        error={
                          formik.touched.customer &&
                          Boolean(formik.errors.customer)
                        }
                        helperText={
                          formik.touched.customer && formik.errors.customer
                        }
                      />
                    )}
                  />
                ) : (
                  <div className="input-field-50 customer-list-gadget-form"></div>
                )}
              </div>

              <div className="input-row-container">
                <TextField
                  className="input-field"
                  id="notes"
                  name="notes"
                  label="Notes"
                  multiline
                  rows={4}
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                />
              </div>
            </div>
          </div>
          <div className="button-container">
            {/* <div>
              <Button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/customer")}
              >
                Cancel
              </Button>
            </div> */}
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

export default GadgetForm;
