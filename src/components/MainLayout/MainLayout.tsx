import "./MainLayout.scss";
import * as React from 'react';
import { MainSidebar } from "../MainSidebar/MainSidebar";
import { Outlet } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import { useAxiosLoader } from "../../services/Axios/AxiosInterceptor";
import Header from "../Header/Header";
import { BreadCrumbProvider } from "../../services/Context/Context";
import { Breadcrumbs } from "../BredCrumbs/BredCrumbs";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

const MainLayout = (props: Props) => {
  const loading: any = useAxiosLoader();

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
      <MainSidebar />
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
     <Box className="main-layout" sx={{ display: 'flex',overflow: 'hidden' }}>
      <BreadCrumbProvider> 
        <CssBaseline />
        <AppBar className="main-header"
          position="fixed"
          sx={{
            width: {lg: `calc(100% - ${drawerWidth}px)` },
            ml: {lg: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: {lg: 'none' } }}
            >
              <MenuIcon sx={{ color: '#000'}} />
            </IconButton>
            <Typography noWrap component="div" className="header-container-fluid">
              <Header />
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: {lg: drawerWidth }, flexShrink: {lg: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block',lg: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none',lg: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main" className="main-body"
          sx={{ flexGrow: 1, width: { lg: `calc(100% - ${drawerWidth}px)` } }}
        >
          <Toolbar />
          <Box component="div" sx={{ paddingTop: '10px'}}>
            <Breadcrumbs />
           </Box>
          <Typography component="div" className="main-content">
            <Outlet />
          </Typography>
        </Box>
        {loading && (
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
      </BreadCrumbProvider>
    </Box>
    // <div className="main-layout">
    //   <BreadCrumbProvider>
    //     {/* <div className="main-header">
    //     <Header />
    //   </div> */}
    //     <div className="main-body">
    //       <div className="main-sidebar">
    //         <MainSidebar />
    //       </div>
    //       <div className="main-right-side">
    //         <div className="main-header">
    //           <Header />
    //           <Breadcrumbs />
    //         </div>
    //         <div className="main-content">
    //           <Outlet />
    //         </div>
    //       </div>
    //     </div>

    //     {loading && (
    //       <Backdrop
    //         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
    //         open={loading}
    //       >
    //         <CircularProgress color="inherit" />
    //       </Backdrop>
    //     )}
    //   </BreadCrumbProvider>
    // </div>
  );
};

export default MainLayout;
