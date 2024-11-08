import React, { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import "./Dashboard.css"; // Import the CSS file

import { BreadCrumbContext } from "../../services/Context/Context";
import CustomerDashboard from "../../components/CustomerDashboard/CustomerDashboard";
import ClientDashboard from "../../components/ClientDashboard/ClientDashboard";
import Admindashboard from "../../components/Admindashboard/Admindashboard";
import Api from "../../services/Axios/ApiInstance";

const Dashboard = () => {
  const api = new Api();
  const header = {
    Icon: "DashboardIconBlack",
    title: "Dashboard",
    breadCrumbsData: [],
  };

  const [userDetails, setUserDetails] = useState<any>();
  const BreadCrumbs = useContext(BreadCrumbContext);
  useEffect(() => {
    BreadCrumbs.setBreadCrumb(header);
    getMe();
  }, []);

  /**
   * Get me api call
   */
  const getMe = async () => {
    try {
      const getMe = await api.get("/user/me", true);
      setUserDetails(getMe.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard-container">
      {userDetails && userDetails.role.includes("customer") && (
        <ClientDashboard />
      )}
      {userDetails && userDetails.role.includes("super_admin") && (
        <Admindashboard />
      )}
    </div>
  );
};

export default Dashboard;
