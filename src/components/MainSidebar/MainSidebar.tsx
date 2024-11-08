import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.scss";
import { List, ListItemButton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Api from "../../services/Axios/ApiInstance";
import IconRenderer from "../Icon/IconRenderer";

export const MainSidebar = () => {
  const api = new Api();
  const navigate = useNavigate();
  const location = useLocation();
  const [permissions, setPermissions] = useState<any>();
  useEffect(() => {
    getPermission();
  }, []);

  const getPermission = async () => {
    try {
      const getPermissions = await api.get("/permission/allowed", true);
      setPermissions(getPermissions.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  let showCustomer = false;
  if (permissions && permissions.length > 0) {
    showCustomer = permissions?.includes("create_customer");
  }

  return (
    <div className="sidebar">
      <div>
        <Typography className="logo-text">Nirbhay</Typography>
        <List sx={{ mb: 5 }} component="nav">
          <div className="side-bar">
            <ListItemButton
              className={` ${
                location.pathname == "/" ? "side-item-name" : "sidebar-item"
              }`}
              onClick={() => navigate("/")}
            >
              <div className="icon-container">
                {location.pathname == "/" ? (
                  <IconRenderer name="DashboardIconBlack" />
                ) : (
                  <IconRenderer name="DashboardIcon" />
                )}
                Dashboard
              </div>
            </ListItemButton>
          </div>
          {showCustomer && (
            <div className="side-bar">
              <ListItemButton
                className={`${
                  location.pathname.startsWith("/customer")
                    ? "side-item-name"
                    : "sidebar-item"
                }`}
                onClick={() => navigate("/customer")}
              >
                <div className="icon-container">
                  {location.pathname.startsWith("/customer") ? (
                    <IconRenderer name="CustomerIconBlack" />
                  ) : (
                    <IconRenderer name="CustomerIcon" />
                  )}
                  Customers
                </div>
              </ListItemButton>
            </div>
          )}
          <div className="side-bar">
            <ListItemButton
              className={`${
                location.pathname.startsWith("/gadget")
                  ? "side-item-name"
                  : "sidebar-item"
              }`}
              onClick={() => navigate("/gadget")}
            >
              <div className="icon-container">
                {location.pathname.startsWith("/gadget") ? (
                  <IconRenderer name="GadgetIconBlack" />
                ) : (
                  <IconRenderer name="GadgetIcon" />
                )}
                Gadgets
              </div>
            </ListItemButton>
          </div>
          <div className="side-bar">
            <ListItemButton
              className={`${
                location.pathname.startsWith("/emergency-contact")
                  ? "side-item-name"
                  : "sidebar-item"
              }`}
              onClick={() => navigate("/emergency-contact")}
            >
              <div className="icon-container">
                {location.pathname.startsWith("/emergency-contact") ? (
                  <IconRenderer name="ContactIconBlack" />
                ) : (
                  <IconRenderer name="ContactIcon" />
                )}
                Emergency Contacts
              </div>
            </ListItemButton>
          </div>
          <div className="side-bar">
            <ListItemButton
              className={`${
                location.pathname.startsWith("/locate-gadget")
                  ? "side-item-name"
                  : "sidebar-item"
              }`}
              onClick={() => navigate("/locate-gadget")}
            >
              <div className="icon-container">
                {location.pathname.startsWith("/locate-gadget") ? (
                  <IconRenderer name="LocateIconBlack" />
                ) : (
                  <IconRenderer name="LocateIcon" />
                )}
                Locate Gadget
              </div>
            </ListItemButton>
          </div>
          <div className="side-bar">
            <ListItemButton
              className={`${
                location.pathname.startsWith("/alert")
                  ? "side-item-name"
                  : "sidebar-item"
              }`}
              onClick={() => navigate("/alert")}
            >
              <div className="icon-container">
                {location.pathname.startsWith("/alert") ? (
                  <IconRenderer name="AlertIconBlack" />
                ) : (
                  <IconRenderer name="AlertIcon" />
                )}
                Alerts
              </div>
            </ListItemButton>
          </div>

          <div className="side-bar">
            <ListItemButton
              className={`${
                location.pathname.startsWith("/faqs")
                  ? "side-item-name"
                  : "sidebar-item"
              }`}
              onClick={() => navigate("/faqs")}
            >
              <div className="icon-container">
                {location.pathname.startsWith("/faqs") ? (
                  <IconRenderer name="FaqIconBlack" />
                ) : (
                  <IconRenderer name="FaqIcon" />
                )}
                FAQ's
              </div>
            </ListItemButton>
          </div>

          {showCustomer && (
            <div className="side-bar">
              <ListItemButton
                className={`${
                  location.pathname.startsWith("/settings")
                    ? "side-item-name"
                    : "sidebar-item"
                }`}
                onClick={() => navigate("/settings")}
              >
                <div className="icon-container">
                  {location.pathname.startsWith("/settings") ? (
                    <IconRenderer name="SettingIconBlack" />
                  ) : (
                    <IconRenderer name="SettingIcon" />
                  )}
                  Settings
                </div>
              </ListItemButton>
            </div>
          )}
        </List>
      </div>
      <div className="sidebar-footer">
        <Typography className="sidebar-footer-logo" sx={{ mb: 0 }}>
          Nirbhay
        </Typography>
        <Typography className="copy-rights-text">
          © 2023 All rights reserved
        </Typography>
      </div>
    </div>
  );
};
