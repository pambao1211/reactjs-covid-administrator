import DashBoard from "../components/pages/dash-board";
import ManageCitizen from "../components/pages/manage-citizen";
import Login from "../components/pages/login";

export default [
    {
        label: "Dash Board",
        path: "/",
        element: <DashBoard />,
    },
    {
        label: "Manage Citizen",
        path: "/manageCitizen",
        element: <ManageCitizen />,
    },
    {
        label: "Login",
        path: "/login",
        element: <Login />,
        isHidden: true,
    },
];
