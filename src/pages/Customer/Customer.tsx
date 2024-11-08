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
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Api from "../../services/Axios/ApiInstance";
import { ConfirmationPopup } from "../../components/ConfirmationPopup/ConfirmationPopup";
import IconRenderer from "../../components/Icon/IconRenderer";
import NoData from "../../components/NoData/Nodata";
import { useNavigate } from "react-router-dom";
import { BreadCrumbContext } from "../../services/Context/Context";
import { CustomerModal } from "../../services/Interface/CustomerModal";
import { errorToast, successToast } from "../../util/util";
import ImageViewer from "../../components/ImageViewer/ImageViewer";

const Customer = () => {
  const header = {
    Icon: "CustomerIconBlack",
    title: "Customers",
    breadCrumbsData: [],
  };
  const BreadCrumbs = useContext(BreadCrumbContext);

  const api = new Api();
  const navigate = useNavigate();
  const [customerList, setCustomerList] = useState<CustomerModal[]>([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [filter, setFilter] = useState<any>();
  const [imageViewerPopup, setImageViewerPopup] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<any>();
  const [actionanchorEl, setactionAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [actionGroup, setActionGroup] = useState<any>();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  useEffect(() => {
    BreadCrumbs.setBreadCrumb(header);
  }, []);
  useEffect(() => {
    user();
  }, [controller, filter]);

  /**
   * Get Api call
   */
  const user = async () => {
    const params: any = {
      page: controller.page + 1,
      per_page: controller.rowsPerPage,
      dropdown: false,
    };
    if (filter) {
      params["name"] = filter;
    }
    try {
      const res = await api.get("/customer/list", true, params);
      setCustomerList(res.data.data);
      setCustomerCount(res.data.meta.total_rows);
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
      const data = {
        status: actionGroup?.status == "DEACTIVE" ? "ACTIVE" : "DEACTIVE",
      };
      const params = {
        uuid: actionGroup?.uuid,
      };
      const changeStatus = await api.patch(
        "/customer/status",
        data,
        true,
        params
      );
      handleactionClose();
      successToast(changeStatus?.data?.message);
      user();
    } catch (error: any) {
      errorToast(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : "Opps something went wrong !!"
      );
    }
  };

  /**
   * Function to handle Edit
   */
  const handleEdit = () => {
    navigate(`/customer/add-update-customer?id=${actionGroup.uuid}`);
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
    <div>
      <div className="top-section">
        <div className="search-box">
          <IconButton type="button" aria-label="search">
            <IconRenderer name={"search"} />
          </IconButton>
          <InputBase
            className="custom-input"
            placeholder="Search by Customer name..."
            inputProps={{ "aria-label": "Search by Customer name..." }}
            onChange={handleFilterInput}
          />
        </div>
        <div className="button-container mt-0">
          <Button
            onClick={() => navigate("/customer/add-update-customer")}
            className="default-btn"
            startIcon={<IconRenderer name="AddIcon" />}
          >
            Add Customer
          </Button>
        </div>
      </div>
      <Paper className="table-section">
        <TableContainer className="table-container">
          <Table className="table" stickyHeader aria-label="sticky table">
            <TableHead className="table-head">
              <TableRow className="table-tr">
                {/* <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">ID</ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell> */}
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">Name</ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">Email</ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      Whatsapp No
                    </ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      No. of Gadget
                    </ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">Added on</ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">Status</ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell>

                <TableCell className="table-th"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {customerList &&
                customerList.length > 0 &&
                customerList.map((data, index) => {
                  return (
                    <TableRow className="table-tr" key={data.uuid}>
                      {/* <TableCell
                        // className="table-td cursor-pointer"
                         className="table-td "
                        // onClick={() =>
                        //   navigate(`/customer/customer-details?id=${data.uuid}`)
                        // }
                      >
                        {index + 1}
                      </TableCell> */}
                      <TableCell
                        // className="table-td cursor-pointer"
                        className="table-td "
                        // onClick={() =>
                        //   navigate(`/customer/customer-details?id=${data.uuid}`)
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
                        //   navigate(`/customer/customer-details?id=${data.uuid}`)
                        // }
                      >
                        {data?.email ? `${data?.email} ` : ""}
                      </TableCell>
                      <TableCell
                        // className="table-td cursor-pointer"
                        className="table-td "
                        // onClick={() =>
                        //   navigate(`/customer/customer-details?id=${data.uuid}`)
                        // }
                      >
                        {data?.whatsapp_mobile_no
                          ? `${data?.whatsapp_mobile_no} `
                          : ""}
                      </TableCell>
                      <TableCell
                        // className="table-td cursor-pointer"
                        className="table-td "
                        // onClick={() =>
                        //   navigate(`/customer/customer-details?id=${data.uuid}`)
                        // }
                      >
                        {data?.gadget_count ? `${data?.gadget_count} ` : "-"}
                      </TableCell>
                      <TableCell
                        // className="table-td cursor-pointer"
                        className="table-td "
                        // onClick={() =>
                        //   navigate(`/customer/customer-details?id=${data.uuid}`)
                        // }
                      >
                        {data?.created_at ? formatDate(data?.created_at) : ""}
                      </TableCell>
                      <TableCell
                        // className="table-td cursor-pointer"
                        className="table-td "
                        // onClick={() =>
                        //   navigate(`/customer/customer-details?id=${data.uuid}`)
                        // }
                      >
                        <Button
                          className={`status-btn status-${
                            data?.status ? data?.status.toLowerCase() : ""
                          }`}
                          variant="contained"
                        >
                          {data?.status ? data?.status : ""}
                        </Button>
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
                          {" "}
                          <MenuItem
                            onClick={() =>
                              navigate(
                                `/customer/customer-details?id=${actionGroup.uuid}`
                              )
                            }
                          >
                            View{" "}
                          </MenuItem>
                          <Divider />
                          <MenuItem onClick={handleEdit}>Edit </MenuItem>
                          <Divider />
                          <MenuItem onClick={handleOpen}>
                            {actionGroup
                              ? actionGroup.status.toLowerCase() === "active"
                                ? "Deactivate"
                                : "Activate"
                              : ""}{" "}
                          </MenuItem>
                        </Menu>
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
      {customerList && customerList.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={customerCount}
          rowsPerPage={controller.rowsPerPage}
          page={controller.page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {openPopup && (
        <ConfirmationPopup
          open={openPopup}
          title={
            actionGroup?.status
              ? `Are you sure you ${
                  actionGroup?.status?.toLowerCase() === "active"
                    ? "deactivate"
                    : "activate"
                } this customer?`
              : ""
          }
          setOpenPopup={setOpenPopup}
          disableBackdropClick={true}
          onClose={handleClose}
          handleConfirm={handleDelete}
        />
      )}
      {imageViewerPopup && (
        <ImageViewer
          open={imageViewerPopup}
          setOpenPopup={setImageViewerPopup}
          selectedFile={selectedFile}
        />
      )}
    </div>
  );
};

export default Customer;
