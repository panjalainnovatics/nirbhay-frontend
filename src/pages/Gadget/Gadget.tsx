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
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Api from "../../services/Axios/ApiInstance";
// import { ConfirmationPopup } from "../../components/ConfirmationPopup/ConfirmationPopup";
import IconRenderer from "../../components/Icon/IconRenderer";
import NoData from "../../components/NoData/Nodata";
import { BreadCrumbContext } from "../../services/Context/Context";
import { ConfirmationPopup } from "../../components/ConfirmationPopup/ConfirmationPopup";
import { useNavigate } from "react-router-dom";
import { GadgetModal } from "../../services/Interface/GadgetModal";
import CustomerVerificationPopup from "../../components/CustomerVerificationPopup/CustomerVerificationPopup";
import { errorToast, successToast } from "../../util/util";

const Gadget = () => {
  const header = {
    Icon: "GadgetIconBlack",
    title: "Gadgets",
    breadCrumbsData: [],
  };
  const api = new Api();
  const navigate = useNavigate();
  const [gadgetList, setgadgetList] = useState<GadgetModal[]>([]);
  const [gadgetCount, setgadgetCount] = useState(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [filter, setFilter] = useState<any>();
  const [openVerificationPopup, setOpenVerificationPopup] = useState(false);
  const [actionanchorEl, setactionAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [actionGroup, setActionGroup] = useState<any>();
  const [controller, setController] = useState({
    page: 0,
    rowsPerPage: 10,
  });
  const BreadCrumbs = useContext(BreadCrumbContext);
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
    };
    if (filter) {
      params["name"] = filter;
    }
    try {
      const res = await api.get("/gadget/list", true, params);
      setgadgetList(res.data.data);
      setgadgetCount(res.data.meta.total_rows);
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
  const handleDelete = async () => {
    try {
      const paylaod = {
        gadget_uuid: actionGroup?.uuid,
      };
      const deleteGadget = await api.delete(`/gadget/delete`, true, paylaod);
      successToast("Gadget deleted successfully !");
      setactionAnchorEl(null);
      user();
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
  return (
    <div>
      <div className="top-section">
        <div className="search-box">
          <IconButton type="button" aria-label="search">
            <IconRenderer name={"search"} />
          </IconButton>
          <InputBase
            className="custom-input"
            placeholder="Search by gadget name..."
            inputProps={{ "aria-label": "Search by   name..." }}
            onChange={handleFilterInput}
          />
        </div>
        <div className="button-container mt-0">
          <Button
            onClick={() => navigate("/gadget/add-update-gadget")}
            // onClick={() => setOpenVerificationPopup(true)}
            className="default-btn"
            startIcon={<IconRenderer name="AddIcon" />}
          >
            Add Gadget
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
                      Gadget Name
                    </ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">
                      Gadget Number
                    </ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell>
                <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">Name</ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell>
                {/* <TableCell className="table-th">
                  <div className="flex">
                    <ListItemText className="item-title">Status</ListItemText>
                    <IconButton>
                      <IconRenderer name={"table-sorting"} />
                    </IconButton>
                  </div>
                </TableCell> */}
                <TableCell className="table-th"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {gadgetList &&
                gadgetList.length > 0 &&
                gadgetList.map((data, index) => {
                  return (
                    <TableRow className="table-tr" key={data.uuid}>
                      <TableCell className="table-td">
                        {" "}
                        {data?.gadget_id ? data?.gadget_id : ""}
                      </TableCell>
                      <TableCell className="table-td">
                        {data?.name ? data?.name : ""}
                      </TableCell>
                      <TableCell className="table-td">
                        {data?.mobile_no ? data?.mobile_no : ""}
                      </TableCell>
                      <TableCell className="table-td">
                        {data?.first_name
                          ? `${data?.first_name} ${data?.last_name}`
                          : ""}
                      </TableCell>
                      {/* <TableCell className="table-td">
                        <Button
                          className={`status-btn status-active`}
                          variant="contained"
                        >
                          Success
                        </Button>
                      </TableCell> */}
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
                                `/gadget/add-update-gadget?id=${actionGroup.uuid}`
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
        {gadgetList && gadgetList.length <= 0 && (
          <div className="table-no-data">
            <NoData />
          </div>
        )}
      </Paper>
      {gadgetList && gadgetList.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={gadgetCount}
          rowsPerPage={controller.rowsPerPage}
          page={controller.page}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}
      {openPopup && (
        <ConfirmationPopup
          open={openPopup}
          title={"Are you sure you want to delete this gadget ?"}
          setOpenPopup={setOpenPopup}
          disableBackdropClick={true}
          onClose={handleClose}
          handleConfirm={handleDelete}
        />
      )}
      {openVerificationPopup && (
        <CustomerVerificationPopup
          open={openVerificationPopup}
          setOpenPopup={setOpenVerificationPopup}
          disableBackdropClick={true}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default Gadget;
