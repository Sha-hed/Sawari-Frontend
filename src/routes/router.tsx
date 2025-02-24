import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home/Home";
import Bikes from "../pages/Bikes/Bikes";
import AboutUs from "../pages/AboutUs/AboutUs";
import Login from "../pages/Shared/Login";
import Register from "../pages/Shared/Register";
import ProtectedRoutes from "../components/layout/ProtectedRoutes";
import DashboardLayout from "../pages/Dashboard/Admin/DashboardLayout";
import AddBike from "../pages/Dashboard/Admin/AddBike";
import BikeDetailsPage from "../pages/Bikes/BikeDetailsPage";
import CheckOut from "../pages/CheckOutPage/CheckOut";
import ManageBike from "../pages/Dashboard/Admin/ManageBike";
import ManageOrders from "../pages/Dashboard/Admin/ManageOrders";
import ManageUser from "../pages/Dashboard/Admin/ManageUser";
import ViewOrders from "../pages/Dashboard/User/ViewOrders";
import PasswordChange from "../pages/Dashboard/User/PasswordChange";
import UserDashboard from "../pages/Dashboard/User/UserDashboard";
import ProtectedFace2 from "../components/layout/ProtectedFace2";
import EditBike from "../pages/Dashboard/Admin/EditBike";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bikes",
        element: <Bikes />,
      },
      {
        path: "/aboutUs",
        element: <AboutUs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/bikeDetails",
        element: <BikeDetailsPage />,
      },
      {
        path: "/checkOut",
        element: (
          <ProtectedRoutes>
            <CheckOut />
          </ProtectedRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "addBike",
        element: <AddBike />,
      },
      {
        index: true,
        element: <ManageBike />,
      },
      {
        path: "manageBike",
        element: <ManageBike />,
      },
      {
        path: "manageOrder",
        element: <ManageOrders />,
      },
      {
        path: "manageUser",
        element: <ManageUser />,
      },
      {
        path: "viewOrder",
        element: <ViewOrders />,
      },
      {
        path: "passwordChange",
        element: <PasswordChange />,
      },
      {
        path: "editBikes",
        element: <EditBike />,
      },
    ],
  },
  {
    path: "/userDashboard",
    element: <UserDashboard />,
    children: [
      {
        index: true,
        element: <ViewOrders />,
      },
      {
        path: "viewOrder",
        element: <ViewOrders />,
      },
      {
        path: "passwordChange",
        element: <PasswordChange />,
      },
    ],
  },
  {
    path: "/face",
    element: (
      <ProtectedRoutes>
        <ProtectedFace2 />
      </ProtectedRoutes>
    ),
  },
]);

export default router;
