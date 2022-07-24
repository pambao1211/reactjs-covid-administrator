import { MdOutlineSpaceDashboard } from "react-icons/md";
import { HiOutlineFolderAdd } from "react-icons/hi";

import DashBoard from "../components/pages/dash-board";
import ManageCitizen from "../components/pages/manage-citizen";
import EditCitizen from "../components/pages/edit-citizen";
import Login from "../components/pages/login";

export const paths = [
  {
    label: "Dash Board",
    path: "/",
    element: <DashBoard />,
    icon: MdOutlineSpaceDashboard,
  },
  {
    label: "Manage Citizen",
    path: "/manageCitizen",
    element: <ManageCitizen />,
    icon: HiOutlineFolderAdd,
  },
  {
    label: "Edit Citizen",
    path: "/editCitizen/:citizenId",
    element: <EditCitizen />,
    isHidden: true,
  },
  {
    label: "Login",
    path: "/login",
    element: <Login />,
    isHidden: true,
  },
];
