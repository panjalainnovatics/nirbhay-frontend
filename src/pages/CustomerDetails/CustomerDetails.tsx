import { Fragment, useContext, useEffect, useState } from "react";
import "./CustomerDetails.scss";

import {
  Avatar,
  Button,
  Card,
  CardContent,
  IconButton,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from "@mui/material";
import {
  CustomerModal,
  CustomerDetailsModal,
  CustomerFormModal,
} from "../../services/Interface/CustomerModal";
import Api from "../../services/Axios/ApiInstance";
import IconRenderer from "../../components/Icon/IconRenderer";
import { BreadCrumbContext } from "../../services/Context/Context";
import NoData from "../../components/NoData/Nodata";
import { useFormik } from "formik";
import { errorToast, successToast } from "../../util/util";

const CustomerDetails = () => {
  const header = {
    Icon: "CustomerIconBlack",
    title: "Customers",
    breadCrumbsData: [
      { label: "Customers", url: "/customer" },
      { label: "Customer Details", url: "" },
    ],
  };
  const MyProfileheader = {
    Icon: "CustomerIconBlack",
    title: "My Profile",
    breadCrumbsData: [],
  };
  const api = new Api();
  const queryString = window.location.search;

  // Parse the query string using URLSearchParams
  const urlParams = new URLSearchParams(queryString);

  // Get the Id value
  const IdValue = urlParams.get("id");
  const [GadgetsList, setGadgetsList] = useState<CustomerModal[]>([]);
  const [GadgetsCount, setGadgetsCount] = useState(0);
  const [customerDetails, setCustomerDetials] =
    useState<CustomerDetailsModal>();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  // State to track whether we are in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Function to handle the edit button click
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // Function to handle form submission (when user clicks 'Save')
  const handleSaveClick = () => {
    // Perform form validation or submit actions here
    setIsEditing(false); // Exit edit mode after saving
  };
  const BreadCrumbs = useContext(BreadCrumbContext);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    let isCustomer;
    if (userData) {
      isCustomer = JSON.parse(userData).role.includes("customer");
    }
    BreadCrumbs.setBreadCrumb(isCustomer ? MyProfileheader : header);
  }, []);
  useEffect(() => {
    user();
    customerdetailsapi();
  }, [controller]);
  /**
   * Get Api call
   */
  const user = async () => {
    const params = {
      page: controller.page + 1,
      per_page: controller.rowsPerPage,
      customer_uuid: IdValue,
    };
    try {
      const res = await api.get("/gadget/list", true, params);
      setGadgetsList(res.data.data);
      setGadgetsCount(res.data.meta.total_rows);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Get cusomer details api call
   */
  const customerdetailsapi = async () => {
    const params = {
      uuid: IdValue,
    };
    try {
      const response = await api.get("/customer/uuid", true, params);
      setCustomerDetials(response.data.data);
      // Set the entire form values at once
    } catch (error) {}
  };

  /**
   * Function to change page using pagination
   * @param event
   * @param newPage
   */
  const handlePageChange = (event: any, newPage: number) => {
    setController((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  /**
   * Function to change number of rows per page using pagination
   * @param event
   */
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setController({
      rowsPerPage: parseInt(event.target.value, 10),
      page: 0,
    });
  };

  /**
   * Date formate handler
   * @param {*} inputDate
   * @returns DD/MM/YYY Date formate
   */
  const formatDate = (inputDate: any) => {
    const date = new Date(inputDate);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  };

  const validate = (values: CustomerFormModal) => {
    const errors: CustomerFormModal = {};

    if (!values.email) {
      errors.email = "Please enter an email";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.mobile_no) {
      errors.mobile_no = "Please enter a mobile number";
    } else if (!/^\d{10}$/.test(values.mobile_no)) {
      errors.mobile_no = "Please enter a valid mobile number";
    }

    if (!values.whatsapp_mobile_no) {
      errors.whatsapp_mobile_no = "Please enter a whatsapp number";
    } else if (!/^\d{10}$/.test(values.whatsapp_mobile_no)) {
      errors.whatsapp_mobile_no = "Please enter a valid whatsapp number";
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      mobile_no: "",
      whatsapp_mobile_no: "",
      email: "",
    },
    validate,
    onSubmit: async (values: any) => {
      const payload = {
        customer_uuid: customerDetails?.uuid,
        email: values.email.toLowerCase(),
        first_name: customerDetails?.first_name,
        last_name: customerDetails?.last_name,
        gender: customerDetails?.gender,
        whatsapp_mobile_no: values.whatsapp_mobile_no,
        mobile_no: values.mobile_no,
      };

      try {
        const res = await api.put("/customer/update", payload, true);
        successToast("Profile updated successfully ");
        customerdetailsapi();
        setIsEditing(false); // Exit edit mode after saving
      } catch (error: any) {
        errorToast(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : "Opps something went wrong !!"
        );
      }
      // Handle form submission here
    },
  });

  return (
    <>
      <div className="employer-details-container">
        <div className="company-about">
          <div className="company-details-card">
            <Avatar
              className="company-logo"
              alt={customerDetails?.first_name}
              src="https://d1ilood7attmpk.cloudfront.net/1712640471252_Group_37616.png"
            />
            <div className="company-name">
              <span>
                {customerDetails?.first_name
                  ? `${customerDetails?.first_name} ${customerDetails?.last_name}`
                  : ""}
              </span>
            </div>
          </div>
          {/* <div className="employer-details-card">
            <Card className="card">
              <CardContent className="card-content">
                <div className="card-title">Contact Info</div>
                <div className="edit-icon-container">
                  <svg
                    className="feather feather-edit"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                </div>
                <div className="card-row row">
                  <div className="card-row-container">
                    <div className="card-details employer-contact">
                      <div className="details-description">
                        {customerDetails?.mobile_no ? (
                          <a href={`tel:${customerDetails.mobile_no}`}>
                            {customerDetails.mobile_no}
                          </a>
                        ) : (
                          "-"
                        )}
                      </div>
                      <div className="details-title">Contact Number</div>
                    </div>
                    <div className="card-details employer-contact">
                      <div className="details-description">
                        {customerDetails?.whatsapp_mobile_no ? (
                          <a href={`tel:${customerDetails.whatsapp_mobile_no}`}>
                            {customerDetails.whatsapp_mobile_no}
                          </a>
                        ) : (
                          "-"
                        )}
                      </div>
                      <div className="details-title">Whatsapp Number</div>
                    </div>
                    <div className="card-details employer-contact">
                      <div className="details-description">
                        {customerDetails?.email ? (
                          <a
                            href={`mailto:${customerDetails.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {customerDetails.email}
                          </a>
                        ) : (
                          "-"
                        )}
                      </div>
                      <div className="details-title">Email-id</div>
                    </div>
                  </div>
                </div>
                <div>
                  <Button type="submit" className="default-btn">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div> */}
          <div className="employer-details-card">
            <Card className="card">
              <CardContent className="card-content">
                <div className="card-title spacing-card-title">
                  <div>Contact Info</div>
                  {/* Edit icon */}
                  {!isEditing && (
                    <div
                      className="edit-icon-container"
                      onClick={() => {
                        setIsEditing(true);
                        formik.setValues({
                          mobile_no:
                            customerDetails?.mobile_no?.toString() || "",
                          whatsapp_mobile_no:
                            customerDetails?.whatsapp_mobile_no?.toString() ||
                            "",
                          email: customerDetails?.email || "",
                        });
                      }}
                    >
                      <svg
                        className="feather feather-edit"
                        fill="none"
                        height="24"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        width="24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="card-row row">
                  <div className="card-row-container">
                    <div className="card-details employer-contact">
                      <div className="details-description">
                        {/* Conditionally render TextField or display value */}
                        {isEditing ? (
                          <TextField
                            className="input-field-50"
                            id="mobile_no"
                            name="mobile_no"
                            label="Contact Number"
                            value={formik.values.mobile_no}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.mobile_no &&
                              Boolean(formik.errors.mobile_no)
                            }
                            helperText={
                              formik.touched.mobile_no &&
                              typeof formik.errors.mobile_no == "string"
                                ? formik.errors.mobile_no
                                : undefined
                            }
                          />
                        ) : customerDetails?.mobile_no ? (
                          <a href={`tel:${customerDetails.mobile_no}`}>
                            {customerDetails.mobile_no}
                          </a>
                        ) : (
                          "-"
                        )}
                      </div>
                      <div className="details-title">Contact Number</div>
                    </div>

                    <div className="card-details employer-contact">
                      <div className="details-description">
                        {isEditing ? (
                          <TextField
                            className="input-field-50"
                            id="whatsapp_mobile_no"
                            name="whatsapp_mobile_no"
                            label="Whatsapp Number"
                            value={formik.values.whatsapp_mobile_no}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.whatsapp_mobile_no &&
                              Boolean(formik.errors.whatsapp_mobile_no)
                            }
                            helperText={
                              formik.touched.whatsapp_mobile_no &&
                              typeof formik.errors.whatsapp_mobile_no ==
                                "string"
                                ? formik.errors.whatsapp_mobile_no
                                : undefined
                            }
                          />
                        ) : customerDetails?.whatsapp_mobile_no ? (
                          <a href={`tel:${customerDetails.whatsapp_mobile_no}`}>
                            {customerDetails.whatsapp_mobile_no}
                          </a>
                        ) : (
                          "-"
                        )}
                      </div>
                      <div className="details-title">Whatsapp Number</div>
                    </div>

                    <div className="card-details employer-contact">
                      <div className="details-description">
                        {isEditing ? (
                          <TextField
                            className="input-field-50"
                            id="email"
                            name="email"
                            label="Email-id"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.email &&
                              Boolean(formik.errors.email)
                            }
                            helperText={
                              formik.touched.email &&
                              typeof formik.errors.email == "string"
                                ? formik.errors.email
                                : undefined
                            }
                          />
                        ) : customerDetails?.email ? (
                          <a
                            href={`mailto:${customerDetails.email}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {customerDetails.email}
                          </a>
                        ) : (
                          "-"
                        )}
                      </div>
                      <div className="details-title">Email-id</div>
                    </div>
                  </div>
                </div>

                {/* Conditionally render Edit or Save button */}
                <div className="btn-container">
                  {isEditing && (
                    <Button
                      type="submit"
                      className="secondary-button btns"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  )}
                  {isEditing && (
                    <Button
                      type="submit"
                      className="default-btn btns"
                      onClick={() => formik.handleSubmit()}
                    >
                      Save
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="employer-details-card">
          <Card className="card">
            <CardContent className="card-content">
              <div className="card-title">Basic Info</div>
              <div className="card-row row">
                <div className="card-details">
                  <div className="details-description">
                    {customerDetails?.gender ? customerDetails?.gender : "-"}
                  </div>
                  <div className="details-title">Gender</div>
                </div>
                <div className="card-details">
                  <div className="details-description">
                    {customerDetails?.gadget_count
                      ? customerDetails?.gadget_count
                      : "-"}
                  </div>
                  <div className="details-title">No of Gadgets</div>
                </div>

                <div className="card-details">
                  <div className="details-description">
                    {customerDetails?.created_at
                      ? formatDate(customerDetails?.created_at)
                      : "-"}
                  </div>
                  <div className="details-title">Joined</div>
                </div>

                <div className="card-details">
                  <div className="details-description">
                    <Button
                      className={`status-btn status-button status-${
                        customerDetails?.status
                          ? customerDetails?.status?.toLowerCase()
                          : "deactive"
                      }`}
                      variant="contained"
                    >
                      {customerDetails?.status
                        ? customerDetails?.status?.replace(/_/g, " ")
                        : ""}
                    </Button>
                  </div>
                  <div className="details-title">Status</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <Paper className="table-section">
          <TableContainer className="table-container customerdetail-table">
            <Table className="table" stickyHeader aria-label="sticky table">
              <TableHead className="table-head">
                <TableRow className="table-tr">
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        Gadget IMEI
                      </ListItemText>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        Mobile No
                      </ListItemText>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">Name</ListItemText>
                    </div>
                  </TableCell>
                  {/* <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">Status</ListItemText>
                    </div>
                  </TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {GadgetsList &&
                  GadgetsList.length > 0 &&
                  GadgetsList.map((data, index) => (
                    <TableRow className="table-tr" key={data.uuid}>
                      <TableCell className="table-td">
                        {data.gadget_id ? data.gadget_id : ""}
                      </TableCell>
                      <TableCell className="table-td">
                        {data.mobile_no ? data.mobile_no : ""}
                      </TableCell>
                      <TableCell className="table-td">
                        {data?.first_name} {data?.last_name}
                      </TableCell>
                      {/* <TableCell className="table-td">
                        <Button
                          className={`status-btn status-${
                            data?.status
                              ? data?.status.toLowerCase()
                              : "deactive"
                          }`}
                          variant="contained"
                        >
                          {data?.status ? data?.status : "DEACTIVE"}
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          {GadgetsList && GadgetsList.length <= 0 && (
            <div className="table-no-data">
              <NoData />
            </div>
          )}
        </Paper>
      </div>
    </>
  );
};

export default CustomerDetails;
