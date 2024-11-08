import "./AlertDetails.scss";
import { useContext, useEffect, useState } from "react";
import { BreadCrumbContext } from "../../services/Context/Context";

import Api from "../../services/Axios/ApiInstance";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import NoData from "../../components/NoData/Nodata";

const AlertDetails = () => {
  const header = {
    Icon: "AlertIconBlack",
    title: "Alert",
    breadCrumbsData: [
      { label: "Alert", url: "/alert" },
      { label: "Alert Details", url: "" },
    ],
  };
  const [userDataFromLocalStorage, setUserDataFromLocalStorage] =
    useState<any>();
  const BreadCrumbs = useContext(BreadCrumbContext);
  useEffect(() => {
    BreadCrumbs.setBreadCrumb(header);
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserDataFromLocalStorage(JSON.parse(userData));
    }
  }, []);
  const api = new Api();
  const queryString = window.location.search;

  // Parse the query string using URLSearchParams
  const urlParams = new URLSearchParams(queryString);

  // Get the Id value
  const IdValue = urlParams.get("id");
  const [alertDetails, setAlertDetails] = useState<any>();
  const [contactList, setContactList] = useState<any>();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  useEffect(() => {
    AlertDetails();
  }, [controller]);
  /**
   * Get Api call
   */
  const AlertDetails = async () => {
    const params = {
      uuid: IdValue,
    };
    try {
      const res = await api.get("/alert/uuid", true, params);
      console.log(res.data.data);
      setAlertDetails(res.data.data);
      setContactList(res.data.data.emergency_contact_details);
    } catch (error) {
      console.error(error);
    }
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
  const userRoles = userDataFromLocalStorage?.role;
  const isAdmin = userRoles?.includes("super_admin");
  return (
    <div className="employer-details-container-alert">
      <div className="company-about">
        <div className="company-details-card">
          <Avatar
            className="company-logo"
            alt={alertDetails?.customer_details?.first_name}
            src="https://d1ilood7attmpk.cloudfront.net/1712640471252_Group_37616.png"
          />
          <div className="company-name">
            <span>
              {alertDetails?.customer_details?.first_name
                ? `${alertDetails?.customer_details?.first_name} ${alertDetails?.customer_details?.last_name}`
                : "-"}
            </span>
          </div>
        </div>
        <div className="employer-details-card w-100">
          <Card className="card">
            <CardContent className="card-content">
              <div className="card-title">Alert Info</div>
              <div className="card-row row">
                <div className="card-row-container">
                  <div className="card-details employer-contact">
                    <div className="details-description">
                      {alertDetails?.latitude ? alertDetails?.latitude : "-"}
                    </div>
                    <div className="details-title">Latitiude</div>
                  </div>
                  <div className="card-details employer-contact">
                    <div className="details-description">
                      {alertDetails?.longitude ? alertDetails?.longitude : "-"}
                    </div>
                    <div className="details-title">Longitude</div>
                  </div>
                  <div className="card-details employer-contact">
                    <div className="details-description">
                      {alertDetails?.created_at
                        ? formatDate(alertDetails?.created_at)
                        : ""}
                    </div>
                    <div className="details-title">Created at</div>
                  </div>
                </div>
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
                  {alertDetails?.gadget_details?.gadget_id
                    ? alertDetails?.gadget_details?.gadget_id
                    : "-"}
                </div>
                <div className="details-title">Gadget IMEI</div>
              </div>
              <div className="card-details">
                <div className="details-description">
                  {alertDetails?.gadget_details?.name
                    ? alertDetails?.gadget_details?.name
                    : "-"}
                </div>
                <div className="details-title">Gadget Name</div>
              </div>
              <div className="card-details">
                <div className="details-description">
                  {alertDetails?.gadget_details?.description
                    ? alertDetails?.gadget_details?.description
                    : "-"}
                </div>
                <div className="details-title">Gadget Description</div>
              </div>
            </div>
            {isAdmin && (
              <div className="card-row row mt-1">
                <div className="card-details">
                  <div className="details-description">
                    {alertDetails?.customer_details?.first_name
                      ? `${alertDetails?.customer_details?.first_name} ${alertDetails?.customer_details?.last_name}`
                      : "-"}
                  </div>
                  <div className="details-title">Customer name</div>
                </div>
                <div className="card-details">
                  <div className="details-description">
                    {alertDetails?.customer_details?.whatsapp_mobile_no
                      ? alertDetails?.customer_details?.whatsapp_mobile_no
                      : "-"}
                  </div>
                  <div className="details-title">Customer Whatsapp number</div>
                </div>
                <div className="card-details">
                  <div className="details-description">
                    {alertDetails?.customer_details?.email
                      ? alertDetails?.customer_details?.email
                      : "-"}
                  </div>
                  <div className="details-title">Customer Email</div>
                </div>
                <div className="card-details">
                  <div className="details-description">
                    <Button
                      className={`status-btn status-button status-${
                        alertDetails?.customer_details?.status
                          ? alertDetails?.customer_details?.status?.toLowerCase()
                          : ""
                      }`}
                      variant="contained"
                    >
                      {alertDetails?.customer_details?.status
                        ? alertDetails?.customer_details?.status?.replace(
                            /_/g,
                            " "
                          )
                        : ""}
                    </Button>
                  </div>
                  <div className="details-title">Customer Status</div>
                </div>
              </div>
            )}
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
                      Emergency contact name
                    </ListItemText>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      Emergency contact number
                    </ListItemText>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      Emergency contact number
                    </ListItemText>
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {contactList &&
                contactList.length > 0 &&
                contactList.map((data: any, index: number) => (
                  <TableRow className="table-tr" key={data.uuid}>
                    <TableCell className="table-td">
                      {data?.first_name ? data?.first_name : ""}{" "}
                      {data?.last_name ? data?.last_name : ""}
                    </TableCell>
                    <TableCell className="table-td">
                      {data.mobile_no ? data.mobile_no : ""}
                    </TableCell>
                    <TableCell className="table-td">
                      {data.email ? data.email : ""}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        {contactList && contactList.length <= 0 && (
          <div className="table-no-data">
            <NoData />
          </div>
        )}
      </Paper>
    </div>
  );
};

export default AlertDetails;
