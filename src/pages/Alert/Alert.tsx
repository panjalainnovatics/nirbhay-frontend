import "./Alert.scss";
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
import { AlertModal } from "../../services/Interface/AlertModal";
import { GadgetModal } from "../../services/Interface/GadgetModal";
import { errorToast, successToast } from "../../util/util";
const Alert = () => {
  const header = {
    Icon: "AlertIconBlack",
    title: "Alert",
    breadCrumbsData: [],
  };
  const api = new Api();
  const navigate = useNavigate();
  const [alertList, setalertList] = useState<AlertModal[]>([]);
  const [alertCount, setalertCount] = useState(0);
  const [filter, setFilter] = useState<any>();
  const [openPopup, setOpenPopup] = useState(false);
  const [actionanchorEl, setactionAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [selectedGadget, setSelectedGadget] = useState<any>();
  const [gadgetList, setgadgetList] = useState<GadgetModal[]>();
  const [showGadgetField, setShowGadgetField] = useState<any>(false);
  const [actionGroup, setActionGroup] = useState<any>();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
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
  useEffect(() => {
    // user();
    getMe();
  }, [controller, filter]);

  const getMe = async () => {
    try {
      const getMe = await api.get("/user/me", true);
      const admin = getMe?.data?.data?.role?.includes("super_admin");
      fetchGadgetList(getMe?.data?.data?.uuid, admin);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchGadgetList = async (id: any, admin?: any) => {
    const params: any = {
      dropdown: true,
    };
    if (!admin) {
      params["customer_uuid"] = id;
    }
    try {
      const res = await api.get("/gadget/list", true, params);
      setgadgetList(res.data.data);
      // setSelectedGadget(res?.data?.data[0]?.uuid);
      setShowGadgetField(true);
      // user(res?.data?.data[0]?.uuid);
      user();
    } catch (error) {
      console.error(error);
      setShowGadgetField(true);
    }
  };

  /**
   * Get Api call
   */
  const user = async (id?: any) => {
    const params: any = {
      page: controller.page + 1,
      per_page: controller.rowsPerPage,
    };
    if (filter) {
      params["search"] = filter;
    }
    // params["gadget_uuid"] = id;
    params["gadget_uuid"] = id ? id : selectedGadget;
    try {
      const res = await api.get("/alert/list", true, params);
      setalertList(res.data.data);
      setalertCount(res.data.meta.total_rows);
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
    try {
      const paylaod = {
        alert_uuid: actionGroup?.uuid,
      };
      const deleteAlert = await api.delete(`/alert/delete`, true, paylaod);
      successToast("Alert deleted successfully !");
      setactionAnchorEl(null);
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
    if (!createdAt) return { date: "" };

    const dateObj = new Date(createdAt);

    // Extracting date in YYYY-MM-DD format
    const date = dateObj.toISOString().split("T")[0];

    return { date };
  };

  const formatTime = (createdAt: any) => {
    if (!createdAt) return { time: "" };

    // Convert the date-time string into a JavaScript Date object
    const utcDate = new Date(createdAt + "Z"); // Add 'Z' to indicate UTC

    // Convert the UTC date to the local time
    // const localDate = utcDate.toLocaleString();
    const localDate = utcDate.toLocaleString("en-gb", { hour12: false });

    // Extract the time part
    const time = localDate.split(",")[1].trim().slice(0, 5); // Use the second part after the comma, trim whitespace, and slice to get HH:MM
    console.log(time, "time");

    return { time };
  };

  const handleGadgetChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setalertList([]);
    setSelectedGadget(event.target.value);
    user(event.target.value);
    // user();
  };

  const userRoles = userDataFromLocalStorage?.role;
  const isAdmin = userRoles?.includes("super_admin");

  return (
    <div>
      <div className="top-section">
        {showGadgetField && (
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
                {isAdmin && (
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        Customer Name
                      </ListItemText>
                      <IconButton>
                        {/* <IconRenderer name={"table-sorting"} /> */}
                      </IconButton>
                    </div>
                  </TableCell>
                )}
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      Last address
                    </ListItemText>
                    <IconButton>
                      {/* <IconRenderer name={"table-sorting"} /> */}
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      Last alert time
                    </ListItemText>
                    <IconButton>
                      {/* <IconRenderer name={"table-sorting"} /> */}
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      Last alert date
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
              {alertList &&
                alertList.length > 0 &&
                alertList.map((data, index) => {
                  const { date } = formatDateAndTime(data?.created_at);
                  const { time } = formatTime(data?.created_at);
                  // formatDateAndTime(data?.created_at);
                  return (
                    <TableRow className="table-tr" key={data.uuid}>
                      <TableCell className="table-td">
                        {data?.gadget_id ? data?.gadget_id : ""}
                      </TableCell>
                      {isAdmin && (
                        <TableCell className="table-td">
                          {data?.first_name
                            ? `${data?.first_name}, ${data?.last_name}`
                            : ""}
                        </TableCell>
                      )}
                      <TableCell className="table-td">
                        {data?.latitude
                          ? `${data?.latitude}, ${data?.longitude}`
                          : "-"}
                      </TableCell>

                      <TableCell className="table-td">
                        {data?.created_at ? time : ""}
                      </TableCell>
                      <TableCell className="table-td">
                        {data?.created_at ? formatDate(date) : ""}
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
                                `/alert/alert-details?id=${actionGroup.uuid}`
                              )
                            }
                          >
                            View
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
        {alertList && alertList.length <= 0 && (
          <div className="table-no-data">
            <NoData />
          </div>
        )}
      </Paper>
      {alertList && alertList.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={alertCount}
          rowsPerPage={controller.rowsPerPage}
          page={controller.page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {openPopup && (
        <ConfirmationPopup
          open={openPopup}
          title={"Are you sure you want to change the status ?"}
          setOpenPopup={setOpenPopup}
          disableBackdropClick={true}
          onClose={handleClose}
          handleConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default Alert;
