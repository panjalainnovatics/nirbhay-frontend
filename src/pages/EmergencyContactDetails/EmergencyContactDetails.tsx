import "./EmergencyContactDetails.scss";
import { Fragment, useContext, useEffect, useState } from "react";
import { BreadCrumbContext } from "../../services/Context/Context";
import {
  EmergencyContactDetailsModal,
  EmergencyContactmodal,
} from "../../services/Interface/EmergencyContactModal";
import Api from "../../services/Axios/ApiInstance";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import IconRenderer from "../../components/Icon/IconRenderer";

const EmergencyContactDetails = () => {
  const header = {
    Icon: "ContactIconBlack",
    title: "Emergency Contact",
    breadCrumbsData: [
      { label: "Emergency contact", url: "/emergency-contact" },
      { label: "Emergency contact Details", url: "" },
    ],
  };
  const BreadCrumbs = useContext(BreadCrumbContext);
  useEffect(() => {
    BreadCrumbs.setBreadCrumb(header);
  }, []);
  const api = new Api();
  const queryString = window.location.search;

  // Parse the query string using URLSearchParams
  const urlParams = new URLSearchParams(queryString);

  // Get the Id value
  const IdValue = urlParams.get("id");
  const [EmergencyContactList, setEmergencyContactList] = useState<
    EmergencyContactmodal[]
  >([]);
  const [EmergencyContactDetails, setEmergencyContactDetails] = useState<any>();
  const [EmergencyContactCount, setEmergencyContactCount] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [actionanchorEl, setactionAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [actionGroup, setActionGroup] = useState<any>();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });

  useEffect(() => {
    getContact();
  }, []);
  /**
   * Get Api call
   */
  const getContact = async () => {
    try {
      const res = await api.get(
        `/emergency_contact/uuid?uuid=${IdValue}`,
        true
      );
      setEmergencyContactDetails(res.data.data);
      // setEmergencyContactList(res.data.data);
      // setEmergencyContactCount(res.data.meta.total_rows);
      console.log(res.data.data); // Ensure you are logging the correct data
    } catch (error) {
      console.error(error);
    }
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
   * Function to execute onclick three dot action
   * @param event
   * @param group
   */
  const handleactionClick = (
    event: React.MouseEvent<HTMLElement>,
    group: any
  ) => {
    setActionGroup(group);
    setactionAnchorEl(event.currentTarget);
  };

  const actionopen = Boolean(actionanchorEl);

  /**
   * Function to close three dot action menu
   */
  const handleactionClose = () => {
    setactionAnchorEl(null);
  };

  /**
   * Function to open confirmation popup
   * @returns
   */
  const handleOpen = () => setOpenPopup(true);

  /**
   * Function to close confirmation popup
   * @returns
   */
  const handleClose = () => setOpenPopup(false);

  /**
   * Function to handle deletion after confirmation
   */
  const handleDelete = () => {
    console.log(`Group Deleted ${actionGroup!.uuid}`);
  };
  const customerDetails: EmergencyContactDetailsModal = {
    name: "Tibicle LLP",
    description: null,
    email: "yjanani@tibicle.com",
    mobile_no: "4561327891",
    website: "tibicle.com",
    gst_no: "HAIKA723982NB",
    pan_no: "CHAH578",
    status: "ACTIVE",
    created_at: "2024-06-07T11:20:45.000Z",
    last_login_at: "2024-06-12T06:10:10.000Z",
    files: {
      uuid: null,
      name: "https://d1ilood7attmpk.cloudfront.net/",
      content_type: null,
      created_at: null,
    },
    address_details: null,
    company_type: "IT",
    active_plan: null,
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
  return (
    <div className="employer-details-container">
      <div className="company-about">
        <div className="company-details-card">
          <Avatar
            className="company-logo"
            alt={
              EmergencyContactDetails?.first_name
                ? EmergencyContactDetails?.first_name
                : ""
            }
            src="https://d1ilood7attmpk.cloudfront.net/1712640471252_Group_37616.png"
          />
          <div className="company-name">
            <span>
              {EmergencyContactDetails?.first_name
                ? EmergencyContactDetails?.first_name
                : ""}{" "}
              {EmergencyContactDetails?.last_name
                ? EmergencyContactDetails?.last_name
                : ""}
            </span>
          </div>
        </div>
        <div className="employer-details-card w-100">
          <Card className="card">
            <CardContent className="card-content">
              <div className="card-title">Contact Info</div>
              <div className="card-row row">
                <div className="card-row-container">
                  <div className="card-details employer-contact">
                    <div className="details-description">
                      {EmergencyContactDetails?.mobile_no ? (
                        <a href={`tel:${EmergencyContactDetails.mobile_no}`}>
                          {EmergencyContactDetails.mobile_no}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="details-title">Contact Number</div>
                  </div>
                  <div className="card-details employer-contact">
                    <div className="details-description">
                      {EmergencyContactDetails?.whatsapp_mobile_no ? (
                        <a
                          href={`tel:${EmergencyContactDetails.whatsapp_mobile_no}`}
                        >
                          {EmergencyContactDetails.whatsapp_mobile_no}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="details-title">Whatsapp Number</div>
                  </div>
                  <div className="card-details employer-contact">
                    <div className="details-description">
                      {EmergencyContactDetails?.email ? (
                        <a
                          href={`mailto:${EmergencyContactDetails.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {EmergencyContactDetails.email}
                        </a>
                      ) : (
                        "-"
                      )}
                    </div>
                    <div className="details-title">Email-id</div>
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
                  {EmergencyContactDetails?.first_name
                    ? EmergencyContactDetails?.first_name
                    : ""}{" "}
                  {EmergencyContactDetails?.last_name
                    ? EmergencyContactDetails?.last_name
                    : ""}
                </div>
                <div className="details-title">Emergency contact Name</div>
              </div>

              <div className="card-details">
                <div className="details-description">
                  {EmergencyContactDetails?.updated_at
                    ? formatDate(EmergencyContactDetails?.updated_at)
                    : formatDate(EmergencyContactDetails?.created_at)}
                </div>
                <div className="details-title">Last Updated</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* <Paper className="table-section">
        <TableContainer className="table-container customerdetail-table">
          <Table className="table" stickyHeader aria-label="sticky table">
            <TableHead className="table-head">
              <TableRow className="table-tr">
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">ID</ListItemText>
                  </div>
                </TableCell>
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
                    <ListItemText className="item-title">Status</ListItemText>
                  </div>
                </TableCell>
                <TableCell className="table-th"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {EmergencyContactList &&
                EmergencyContactList.length > 0 &&
                EmergencyContactList.map((data, index) => (
                  <TableRow className="table-tr" key={data.uuid}>
                    <TableCell className="table-td">{index + 1}</TableCell>
                    <TableCell className="table-td">
                      {data.mobile_no ? data.mobile_no : ""}
                    </TableCell>
                    <TableCell className="table-td">
                      {data?.first_name} {data?.last_name}
                    </TableCell>
                    <TableCell className="table-td">
                      <Button
                        className={`status-btn status-active`}
                        variant="contained"
                      >
                        Success
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            
            </TableBody>
          </Table>
        </TableContainer>
      </Paper> */}
      {/* {EmergencyContactList && EmergencyContactList.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={candidatesCount}
          rowsPerPage={controller.rowsPerPage}
          page={controller.page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )} */}
    </div>
  );
};

export default EmergencyContactDetails;
