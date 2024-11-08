import { Suspense, lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import AuthLayout from "../components/AuthLayout/AuthLayout";
import MainLayout from "../components/MainLayout/MainLayout";

// Lazy loading the pages as per routers
const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Customer = lazy(() => import("../pages/Customer/Customer"));
const CustomerDetails = lazy(
  () => import("../pages/CustomerDetails/CustomerDetails")
);
const AddUpdateCustomer = lazy(
  () => import("../pages/AddUpdateCustomer/AddUpdateCustomer")
);
const Gadget = lazy(() => import("../pages/Gadget/Gadget"));
const AddUpdateGadget = lazy(
  () => import("../pages/AddUpdateGadget/AddUpdateGadget")
);
const EmergencyContact = lazy(
  () => import("../pages/EmergencyContact/EmergencyContact")
);
const AddUpadateEmergencyContact = lazy(
  () => import("../pages/AddUpdateEmergencyContact/AddUpdateEmergencyContact")
);
const EmergencyContactDetails = lazy(
  () => import("../pages/EmergencyContactDetails/EmergencyContactDetails")
);
const LocateGadget = lazy(() => import("../pages/LocateGadget/LocateGadget"));
const Faqs = lazy(() => import("../pages/Faqs/Faqs"));
const Settings = lazy(() => import("../pages/Settings/Settings"));
const Alert = lazy(() => import("../pages/Alert/Alert"));
const AlertDetails = lazy(() => import("../pages/AlertDetails/AlertDetails"));
const Login = lazy(() => import("../pages/Login/Login"));
const ForgetPassword = lazy(
  () => import("../pages/ForgetPassword/ForgetPassword")
);
const ResetPassword = lazy(
  () => import("../pages/ResetPassword/ResetPassword")
);
const ChangePassword = lazy(
  () => import("../pages/ChangePassword/ChangePassword")
);
const Registration = lazy(() => import("../pages/Registration/Registration"));

const requireAuth = async () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw redirect("/auth/login");
  }
  return null;
};

const alreadyAuth = async () => {
  const accessToken = localStorage.getItem("access_token");
  if (accessToken) {
    throw redirect("/");
  }
  return null;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    loader: requireAuth,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<div></div>}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "/myprofile",
        element: (
          <Suspense fallback={<div></div>}>
            <CustomerDetails />
          </Suspense>
        ),
      },
      {
        path: "/customer",
        element: (
          <Suspense fallback={<div></div>}>
            <Customer />
          </Suspense>
        ),
      },
      {
        path: "/customer/customer-details",
        element: (
          <Suspense fallback={<div></div>}>
            <CustomerDetails />
          </Suspense>
        ),
      },
      {
        path: "/customer/add-update-customer",
        element: (
          <Suspense fallback={<div></div>}>
            <AddUpdateCustomer />
          </Suspense>
        ),
      },
      {
        path: "/gadget",
        element: (
          <Suspense fallback={<div></div>}>
            <Gadget />
          </Suspense>
        ),
      },
      {
        path: "/gadget/add-update-gadget",
        element: (
          <Suspense fallback={<div></div>}>
            <AddUpdateGadget />
          </Suspense>
        ),
      },
      {
        path: "/emergency-contact",
        element: (
          <Suspense fallback={<div></div>}>
            <EmergencyContact />
          </Suspense>
        ),
      },
      {
        path: "/emergency-contact/add-update-emergency-contact",
        element: (
          <Suspense fallback={<div></div>}>
            <AddUpadateEmergencyContact />
          </Suspense>
        ),
      },
      {
        path: "/emergency-contact/emergency-contact-details",
        element: (
          <Suspense fallback={<div></div>}>
            <EmergencyContactDetails />
          </Suspense>
        ),
      },
      {
        path: "/locate-gadget",
        element: (
          <Suspense fallback={<div></div>}>
            <LocateGadget />
          </Suspense>
        ),
      },
      {
        path: "/alert",
        element: (
          <Suspense fallback={<div></div>}>
            <Alert />
          </Suspense>
        ),
      },
      {
        path: "/alert/alert-details",
        element: (
          <Suspense fallback={<div></div>}>
            <AlertDetails />
          </Suspense>
        ),
      },
      {
        path: "/faqs",
        element: (
          <Suspense fallback={<div></div>}>
            <Faqs />
          </Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <Suspense fallback={<div></div>}>
            <Settings />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<div></div>}>
            <Login />
          </Suspense>
        ),
        loader: alreadyAuth,
      },
      {
        path: "forget-password",
        element: (
          <Suspense fallback={<div></div>}>
            <ForgetPassword />
          </Suspense>
        ),
        loader: alreadyAuth,
      },
      {
        path: "reset-password",
        element: (
          <Suspense fallback={<div></div>}>
            <ResetPassword />
          </Suspense>
        ),
        loader: alreadyAuth,
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<div></div>}>
            <ChangePassword />
          </Suspense>
        ),
      },
      {
        path: "registration",
        element: (
          <Suspense fallback={<div></div>}>
            <Registration />
          </Suspense>
        ),
        loader: alreadyAuth,
      },
    ],
  },
]);
