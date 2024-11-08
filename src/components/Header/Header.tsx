import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import IconRenderer from "../Icon/IconRenderer";
import { TibButton } from "../TIbbutton/Tibbutton";
import { useContext, useEffect, useState } from "react";
import "./Header.scss";
import { useNavigate } from "react-router";
import { BreadCrumbContext } from "../../services/Context/Context";
import Api from "../../services/Axios/ApiInstance";

const Header = () => {
  const api = new Api();
  const navigate = useNavigate();
  const BreadCrumbs = useContext(BreadCrumbContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userName, setUserName] = useState<string>();
  const [userDetails, setUserDetails] = useState<any>();
  const [open, setOpen] = useState(false);
  const anchoropen = Boolean(anchorEl);
  useEffect(() => {
    getMe();
    getPermissions();
  }, []);

  /**
   * Get me api call
   */
  const getMe = async () => {
    try {
      const getMe = await api.get("/user/me", true);
      const userString = JSON.stringify(getMe.data.data);
      localStorage.setItem("user", userString);
      setUserDetails(getMe.data.data);
      const userName = `${getMe.data.data.first_name} ${getMe.data.data.last_name}`;
      setUserName(userName);
    } catch (error) {
      console.error(error);
    }
  };

  const getPermissions = async () => {
    try {
      const getPermissions = await api.get("/permission/allowed", true);
      const permissionString = JSON.stringify(getPermissions.data.data);
      localStorage.setItem("permissions", permissionString);
    } catch (error) {
      console.error(error);
    }
  };
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlefilterOpen = () => {
    setOpen(true);
  };
  //   const cartItems = useSelector((state) => state.cart.items);
  const handlePopupClose = () => setOpen(false);

  console.log(userDetails, "UserDetaisl");

  return (
    <div className="header-container">
      {" "}
      <AppBar className="header-section" position="static">
        <Toolbar className="header" variant="dense">
          {BreadCrumbs.breadCrumb ? (
            <div className="header-title-container">
              <IconRenderer name={BreadCrumbs?.breadCrumb?.Icon} />
              <Typography className="header-title">
                {BreadCrumbs?.breadCrumb?.title}
              </Typography>
            </div>
          ) : (
            <div></div>
          )}

          <Box>
            <IconButton
            // onClick={() => router.push("/plans/plan-management/view-cart")}
            >
              {/* <Badge
          className="notications-icon"
          badgeContent={cartItems?.length > 9 ? "9+" : cartItems?.length}
          color="error"
        >
          <IconRenderer name={"cart"} />
        </Badge> */}
            </IconButton>
            <IconButton>
              {/* <Badge
          className="notications-icon"
          badgeContent={
            userData?.data?.notification_count > 9
              ? "9+"
              : userData?.data?.notification_count
          }
          color="error"
          onClick={handlefilterOpen}
        >
          <Icon name={"notications"} />
        </Badge> */}
            </IconButton>
            <TibButton
              className="user-profile"
              onClick={handleClick}
              // size="small"
              // sx={{ ml: 2 }}
              // aria-controls={anchoropen ? "account-menu" : undefined}
              // aria-haspopup="true"
              // aria-expanded={anchoropen ? "true" : undefined}
            >
              <Avatar
                className="profile-avatar"
                alt="User"
                src="https://d1ilood7attmpk.cloudfront.net/1712640471252_Group_37616.png"
              />
              <ListItemText className="user-name">{userName}</ListItemText>
            </TibButton>
            <Menu
              anchorEl={anchorEl}
              className="user-profile-dropdown"
              id="account-menu"
              open={anchoropen}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              {/* <MenuItem>
                <div className="flex user-details">
                  <div className="user-photo">
                    <Avatar
                      className="user-img"
                        alt={userName}
                      src="https://d1ilood7attmpk.cloudfront.net/1712640471252_Group_37616.png"
                    />
                  </div>
                  <div className="user-item">
                    <div className="user-name">{userName}</div>
                    <div className="user-email">{userEmail}</div>
                  </div>
                </div>
              </MenuItem>
              <Divider /> */}
              {userDetails?.role == "customer" && (
                <MenuItem
                  onClick={() =>
                    userDetails?.role == "customer" &&
                    navigate(`/myprofile?id=${userDetails?.uuid}`)
                  }
                >
                  My Profile
                </MenuItem>
              )}
              {userDetails?.role == "customer" && <Divider />}
              <MenuItem onClick={() => navigate("/auth/change-password")}>
                Change Password
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  localStorage.clear();
                  navigate("/auth/login");
                }}
              >
                Log out
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
