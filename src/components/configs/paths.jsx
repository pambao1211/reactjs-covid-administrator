import DashBoard from "../pages/dash-board";
import ManageCitizen from "../pages/manage-citizen";

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
];
