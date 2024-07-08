import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Dashboard from "src/pages/Dashboard";
import Login from "src/pages/Auth/Login";

const routes = [
  { path: NAVIGATION_ROUTES.DASHBOARD, element: <Dashboard /> },
  {
    path: NAVIGATION_ROUTES.LOGIN,
    element: <Login />,
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
