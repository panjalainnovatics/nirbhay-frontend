import React, { useContext } from "react";
import {
  Button,
  Divider,
  IconButton,
  InputBase,
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
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Api from "../../services/Axios/ApiInstance";
// import { ConfirmationPopup } from "../../components/ConfirmationPopup/ConfirmationPopup";
import IconRenderer from "../../components/Icon/IconRenderer";
import { EmergencyContactmodal } from "../../services/Interface/EmergencyContactModal";
import { ConfirmationPopup } from "../../components/ConfirmationPopup/ConfirmationPopup";
import NoData from "../../components/NoData/Nodata";
import { useNavigate } from "react-router-dom";
import { BreadCrumbContext } from "../../services/Context/Context";
import { GadgetModal } from "../../services/Interface/GadgetModal";
import { errorToast, successToast } from "../../util/util";
import "./EmergencyContact.scss";

const EmergencyContact = () => {
  const header = {
    Icon: "ContactIconBlack",
    title: "Emergency Contact",
    breadCrumbsData: [],
  };
  const api = new Api();
  const navigate = useNavigate();
  const [emergencyContactList, setemergencyContactList] = useState<
    EmergencyContactmodal[]
  >([]);
  const [emergencyContactCount, setemergencyContactCount] = useState(0);
  const [filter, setFilter] = useState<any>();
  const [openPopup, setOpenPopup] = useState(false);
  const [actionanchorEl, setactionAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [actionGroup, setActionGroup] = useState<any>();
  const [userDataFromLocalStorage, setUserDataFromLocalStorage] =
    useState<any>();
  const [selectedGadget, setSelectedGadget] = useState<any>();
  const [gadgetList, setgadgetList] = useState<GadgetModal[]>();
  const [showGadgetField, setShowGadgetField] = useState<any>(false);

  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const BreadCrumbs = useContext(BreadCrumbContext);
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUserDataFromLocalStorage(JSON.parse(userData));
    }
    BreadCrumbs.setBreadCrumb(header);
  }, []);
  useEffect(() => {
    setemergencyContactList([]);
    getMe();
  }, [controller, filter]);

  const getMe = async () => {
    try {
      const getMe = await api.get("/user/me", true);
      getMe?.data?.data?.role?.includes("super_admin")
        ? user()
        : fetchGadgetList(getMe?.data?.data?.uuid);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchGadgetList = async (id: any) => {
    try {
      const params = {
        dropdown: true,
        customer_uuid: id,
      };
      const res = await api.get("/gadget/list", true, params);
      setgadgetList(res.data.data);
      setSelectedGadget(res?.data?.data[0]?.uuid);
      setShowGadgetField(true);
      user(res?.data?.data[0]?.uuid, true);
    } catch (error) {
      console.error(error);
      setShowGadgetField(true);
    }
  };
  /**
   * Get Api call
   */
  const user = async (id?: any, checkGadget?: boolean) => {
    const params: any = {
      page: controller.page + 1,
      per_page: controller.rowsPerPage,
    };
    if (filter) {
      params["search"] = filter;
    }
    if (!isAdmin) {
      params["gadget_uuid"] = id;
    }
    try {
      const res = await api.get("/emergency_contact/list", true, params);
      setemergencyContactList(res.data.data);
      setemergencyContactCount(res.data.meta.total_rows);
      checkGadget && !id && setemergencyContactList([]);
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
  const handleDelete = async () => {
    console.log(`Group Deleted ${actionGroup}`);
    try {
      const paylaod = {
        emergency_contact_uuid: actionGroup?.uuid,
      };
      const deleteContact = await api.delete(
        `/emergency_contact/delete`,
        true,
        paylaod
      );
      setactionAnchorEl(null);
      successToast("Contact deleted successfully !");
      setemergencyContactList([]);
      getMe();
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Opps something went wrong !!"
      );
      setactionAnchorEl(null);
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
  /**
   * function that handles search filter
   * @param {*} event
   */
  const handleFilterInput = (event: any) => {
    const inputValue = event.target.value;
    if (inputValue.length > 2) {
      setFilter(inputValue);
    } else {
      setFilter("");
    }
  };

  const formatDateAndTime = (createdAt: any) => {
    if (!createdAt) return { date: "", time: "" };

    const dateObj = new Date(createdAt);

    // Extracting date in YYYY-MM-DD format
    const date = dateObj.toISOString().split("T")[0];

    // Extracting time in HH:MM format
    const time = dateObj.toTimeString().split(" ")[0].slice(0, 5);

    return { date, time };
  };
  const handleGadgetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setemergencyContactList([]);
    setSelectedGadget(event.target.value);
    user(event.target.value, true);
  };
  const userRoles = userDataFromLocalStorage?.role;
  const isAdmin = userRoles?.includes("super_admin");
  console.log("emergency contact list ", emergencyContactList);

  return (
    <div>
      <div className="top-section">
        {!isAdmin && showGadgetField && (
          <TextField
            className="input-field-locate mb-locate-gadget-05 w-50"
            select
            id="gadget"
            name="gadget"
            label="Gadget*"
            value={selectedGadget}
            onChange={handleGadgetChange}
          >
            {gadgetList && gadgetList.length > 0 ? (
              gadgetList.map((data, index) => {
                return (
                  <MenuItem value={data.uuid} key={data.uuid}>
                    {data?.name ? data?.name : "-"}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem value="No Data Available" key="1" disabled>
                No gadget available
              </MenuItem>
            )}
          </TextField>
        )}
        {!isAdmin && !showGadgetField && <div></div>}
        {isAdmin && <div></div>}
        <div className="button-container mt-0">
          <Button
            // onClick={() => navigate(" /add-update-emergency-contact")}
            onClick={() =>
              navigate("/emergency-contact/add-update-emergency-contact")
            }
            className="default-btn"
            startIcon={<IconRenderer name="AddIcon" />}
          >
            Add Contact
          </Button>
        </div>
      </div>

      <Paper className="table-section">
        <TableContainer className="table-container">
          <Table className="table" stickyHeader aria-label="sticky table">
            <TableHead className="table-head">
              <TableRow className="table-tr">
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      Gagdget IMEI
                    </ListItemText>
                    <IconButton>
                      {/* <IconRenderer name={"table-sorting"} /> */}
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      Emergency contact name
                    </ListItemText>
                    <IconButton>
                      {/* <IconRenderer name={"table-sorting"} /> */}
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      {" "}
                      Emergency contact number
                    </ListItemText>
                    <IconButton>
                      {/* <IconRenderer name={"table-sorting"} /> */}
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      Last updated on
                    </ListItemText>
                    <IconButton>
                      {/* <IconRenderer name={"table-sorting"} /> */}
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {emergencyContactList &&
                emergencyContactList.length > 0 &&
                emergencyContactList.map((data, index) => {
                  const { date, time } = formatDateAndTime(data?.created_at);
                  return (
                    <TableRow className="table-tr" key={data.gadget_name}>
                      <TableCell
                        // className="table-td cursor-pointer"
                        className="table-td "
                        // onClick={() =>
                        //   navigate(
                        //     `/emergency-contact/emergency-contact-details?id=${data?.uuid}`
                        //   )
                        // }
                      >
                        {data?.gadget_id ? data?.gadget_id : ""}
                      </TableCell>
                      <TableCell
                        // className="table-td cursor-pointer"
                        className="table-td "
                        // onClick={() =>
                        //   navigate(
                        //     `/emergency-contact/emergency-contact-details?id=${data?.uuid}`
                        //   )
                        // }
                      >
                        {data?.first_name
                          ? `${data?.first_name} ${data?.last_name}`
                          : ""}
                      </TableCell>
                      <TableCell
                        // className="table-td cursor-pointer"
                        className="table-td "
                        // onClick={() =>
                        //   navigate(
                        //     `/emergency-contact/emergency-contact-details?id=${data?.uuid}`
                        //   )
                        // }
                      >
                        {data?.mobile_no ? data?.mobile_no : ""}
                      </TableCell>
                      <TableCell
                        // className="table-td cursor-pointer"
                        className="table-td "
                        // onClick={() =>
                        //   navigate(
                        //     `/emergency-contact/emergency-contact-details?id=${data?.uuid}`
                        //   )
                        // }
                      >
                        {data?.created_at ? formatDate(data?.created_at) : ""}
                      </TableCell>

                      <TableCell className="table-td">
                        <IconButton
                          onClick={(event) => handleactionClick(event, data)}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={
                            actionopen ? "account-menu" : undefined
                          }
                          aria-haspopup="true"
                          aria-expanded={actionopen ? "true" : undefined}
                        >
                          <IconRenderer name={"action"} />
                        </IconButton>
                        <Menu
                          anchorEl={actionanchorEl}
                          className="dropdown"
                          id="account-menu"
                          open={actionopen}
                          onClose={handleactionClose}
                          PaperProps={{
                            elevation: 0,
                          }}
                          transformOrigin={{
                            horizontal: "right",
                            vertical: "top",
                          }}
                          anchorOrigin={{
                            horizontal: "right",
                            vertical: "bottom",
                          }}
                        >
                          <MenuItem
                            onClick={() =>
                              navigate(
                                `/emergency-contact/emergency-contact-details?id=${actionGroup.uuid}`
                              )
                            }
                          >
                            View{" "}
                          </MenuItem>
                          <Divider />
                          <MenuItem
                            onClick={() =>
                              navigate(
                                `/emergency-contact/add-update-emergency-contact?id=${actionGroup.uuid}`
                              )
                            }
                          >
                            Edit{" "}
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={handleOpen}>Delete </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        {emergencyContactList && emergencyContactList.length <= 0 && (
          <div className="table-no-data">
            <NoData />
          </div>
        )}
      </Paper>
      {emergencyContactList && emergencyContactList.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={emergencyContactCount}
          rowsPerPage={controller.rowsPerPage}
          page={controller.page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {openPopup && (
        <ConfirmationPopup
          open={openPopup}
          title={"Are you sure you want to delete this emergency contact ?"}
          setOpenPopup={setOpenPopup}
          disableBackdropClick={true}
          onClose={handleClose}
          handleConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default EmergencyContact;
