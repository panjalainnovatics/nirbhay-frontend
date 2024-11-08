import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  IconButton,
  InputBase,
  InputLabel,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import IconRenderer from "../Icon/IconRenderer";
import "./Admindashboard.scss";
import Api from "../../services/Axios/ApiInstance";
import { AlertModal } from "../../services/Interface/AlertModal";
import NoData from "../NoData/Nodata";
import { CustomerModal } from "../../services/Interface/CustomerModal";
const Admindashboard = () => {
  const api = new Api();

  const [alertList, setalertList] = useState<AlertModal[]>([]);
  const [customerList, setCustomerList] = useState<CustomerModal[]>([]);
  const [dashboardCount, setDasboardCount] = useState<any>();

  useEffect(() => {
    AlertList();
    CustomerList();
    DashboardCountApi();
  }, []);

  /**
   * Get api call
   */
  const DashboardCountApi = async () => {
    try {
      const res = await api.get("/dashboard/count", true);
      setDasboardCount(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Get Api call
   */
  const AlertList = async (id?: any) => {
    const params: any = {
      page: 1,
      per_page: 3,
    };

    try {
      const res = await api.get("/alert/list", true, params);
      setalertList(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  /**
   * Get Api call
   */
  const CustomerList = async () => {
    const params: any = {
      page: 1,
      per_page: 3,
      dropdown: false,
    };

    try {
      const res = await api.get("/customer/list", true, params);
      setCustomerList(res.data.data);
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
    const localDate = utcDate.toLocaleString("en-gb", { hour12: false });

    // Extract the time part
    const time = localDate.split(",")[1].trim().slice(0, 5); // Use the second part after the comma, trim whitespace, and slice to get HH:MM
    console.log(time, "time");

    return { time };
  };
  return (
    <div>
      {" "}
      <div className="dashboard-top-section">
        <div className="box-section row">
          <div className="card">
            <div className="top">
              <span className="fs-12 tb-fw-medium text-black-color">No of</span>
              <h2 className=" fs-16 tb-fw-bold text-black-color">Users</h2>
            </div>
            <div className="bottom">
              <h1 className="fs-46 tb-fw-bold text-black-color">
                {dashboardCount?.user ? dashboardCount?.user : "0"}
              </h1>
            </div>
            <div className="box-circle hi row-align-justify-center">
              <IconRenderer name="user-icon" />
            </div>
          </div>

          <div className="card">
            <div className="top">
              <span className="fs-12 tb-fw-medium text-black-color">No of</span>
              <h2 className=" fs-16 tb-fw-bold text-black-color">Gadget</h2>
            </div>
            <div className="bottom">
              <h1 className="fs-46 tb-fw-bold text-black-color">
                {" "}
                {dashboardCount?.gadget ? dashboardCount?.gadget : "0"}
              </h1>
            </div>
            <div className="box-circle row-align-justify-center">
              <IconRenderer name="task-icon" />
            </div>
          </div>

          <div className="card">
            <div className="top">
              <span className="fs-12 tb-fw-medium text-black-color">No of</span>
              <h2 className=" fs-16 tb-fw-bold text-black-color">Alerts</h2>
            </div>
            <div className="bottom">
              <h1 className="fs-46 tb-fw-bold text-black-color">
                {" "}
                {dashboardCount?.alert ? dashboardCount?.alert : "0"}
              </h1>
            </div>
            <div className="box-circle row-align-justify-center">
              <IconRenderer name="refresh-icon" />
            </div>
          </div>

          <div className="card">
            <div className="top">
              <span className="fs-12 tb-fw-medium text-black-color">No of</span>
              <h2 className=" fs-16 tb-fw-bold text-black-color">
                Emergency contact
              </h2>
            </div>
            <div className="bottom">
              <h1 className="fs-46 tb-fw-bold text-black-color">
                {dashboardCount?.emergencyContact
                  ? dashboardCount?.emergencyContact
                  : "0"}{" "}
              </h1>
            </div>
            <div className="box-circle row-align-justify-center">
              <IconRenderer name="discrepancy-icon" />
            </div>
          </div>
        </div>
      </div>
      <div className="dashboard-bottom-section mt-2">
        <div className="row-align-justify-between">
          <h2 className="fs-18 tb-fw-bold text-black-color mb-2  table-heading">
            Recent Alerts
          </h2>
          {/* <Box sx={{ minWidth: 125 }} className="dropdown table-heading">
            <FormControl fullWidth>
              <InputLabel id="simple-select-label">This Week</InputLabel>
              <Select
                labelId="simple-select-label"
                id="demo-simple-select"
                //   value={age}
                //   onChange={handleChange}
              >
                <MenuItem value={10} className="dropdown-word">
                  Day
                </MenuItem>
                <MenuItem value={20} className="dropdown-word">
                  Week
                </MenuItem>
                <MenuItem value={30} className="dropdown-word">
                  Month
                </MenuItem>
                <MenuItem value={30} className="dropdown-word">
                  Quarter
                </MenuItem>
                <MenuItem value={30} className="dropdown-word">
                  Annual
                </MenuItem>
                <MenuItem value={30} className="dropdown-word">
                  Custom Date
                </MenuItem>
              </Select>
            </FormControl>
          </Box> */}
        </div>
        <Paper className="table-section">
          <TableContainer className="table-container">
            <Table className="table" stickyHeader aria-label="sticky table">
              <TableHead className="table-head">
                <TableRow className="table-tr">
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        {" "}
                        Gadget IMEI
                      </ListItemText>
                      <IconButton>
                        <IconRenderer name={"table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        Customer Name
                      </ListItemText>
                      <IconButton>
                        <IconRenderer name={"black-table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        Last Alert Address
                      </ListItemText>
                      <IconButton>
                        <IconRenderer name={"black-table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        Last Alert Time
                      </ListItemText>
                      <IconButton>
                        <IconRenderer name={"black-table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        Last Alert Date
                      </ListItemText>
                      <IconButton>
                        <IconRenderer name={"black-table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
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
                          {data?.gadget_id ? data?.gadget_id : "-"}
                        </TableCell>

                        <TableCell className="table-td">
                          {data?.first_name
                            ? `${data?.first_name}, ${data?.last_name}`
                            : "-"}
                        </TableCell>

                        <TableCell className="table-td">
                          {data?.latitude
                            ? `${data?.latitude}, ${data?.longitude}`
                            : "-"}
                        </TableCell>

                        <TableCell className="table-td">
                          {data?.created_at ? time : "-"}
                        </TableCell>
                        <TableCell className="table-td">
                          {data?.created_at ? formatDate(date) : "-"}
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
      </div>
      <div className="dashboard-bottom-section mt-2">
        <div className="row-align-justify-between">
          <h2 className="fs-18 tb-fw-bold text-black-color mb-2  table-heading">
            Recent Users
          </h2>
        </div>
        <Paper className="table-section">
          <TableContainer className="table-container">
            <Table className="table" stickyHeader aria-label="sticky table">
              <TableHead className="table-head">
                <TableRow className="table-tr">
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">Name</ListItemText>
                      <IconButton>
                        <IconRenderer name={"black-table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">Email</ListItemText>
                      <IconButton>
                        <IconRenderer name={"black-table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        Whatsapp No
                      </ListItemText>
                      <IconButton>
                        <IconRenderer name={"black-table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        No. of Gadget
                      </ListItemText>
                      <IconButton>
                        <IconRenderer name={"black-table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">
                        Added on
                      </ListItemText>
                      <IconButton>
                        <IconRenderer name={"black-table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
                  <TableCell className="table-th">
                    <div className="flex">
                      <ListItemText className="item-title">Status</ListItemText>
                      <IconButton>
                        <IconRenderer name={"black-table-sorting"} />
                      </IconButton>
                    </div>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="table-body">
                {customerList &&
                  customerList.length > 0 &&
                  customerList.map((data, index) => {
                    return (
                      <TableRow className="table-tr" key={data.uuid}>
                        <TableCell className="table-td ">
                          {data?.first_name
                            ? `${data?.first_name} ${data?.last_name}`
                            : ""}
                        </TableCell>
                        <TableCell className="table-td ">
                          {data?.email ? `${data?.email} ` : ""}
                        </TableCell>
                        <TableCell className="table-td ">
                          {data?.whatsapp_mobile_no
                            ? `${data?.whatsapp_mobile_no} `
                            : ""}
                        </TableCell>
                        <TableCell className="table-td ">
                          {data?.gadget_count ? `${data?.gadget_count} ` : "-"}
                        </TableCell>
                        <TableCell className="table-td ">
                          {data?.created_at ? formatDate(data?.created_at) : ""}
                        </TableCell>
                        <TableCell className="table-td ">
                          <Button
                            className={`status-btn status-${
                              data?.status ? data?.status.toLowerCase() : ""
                            }`}
                            variant="contained"
                          >
                            {data?.status ? data?.status : ""}
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          {customerList && customerList.length <= 0 && (
            <div className="table-no-data">
              <NoData />
            </div>
          )}
        </Paper>
      </div>
    </div>
  );
};

export default Admindashboard;
