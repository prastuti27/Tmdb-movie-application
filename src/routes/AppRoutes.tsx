import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Dashboard from "src/pages/Dashboard";
import Moviedetails from "src/pages/Moviedetails";
import SearchList from "../pages/SearchList";
import Navbar from "../components/Navbar";
import Login from "../pages/Auth/Login";

const isAuthenticated = (): boolean => {
  return localStorage.getItem("tmdb_session_id") !== null;
};

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute = ({ element }: PrivateRouteProps) => {
  return isAuthenticated() ? (
    element
  ) : (
    <Navigate to={NAVIGATION_ROUTES.LOGIN} />
  );
};

const routes = [
  {
    path: NAVIGATION_ROUTES.DASHBOARD,
    element: <PrivateRoute element={<Dashboard />} />,
  },
  {
    path: NAVIGATION_ROUTES.MOVIEDETAILS,
    element: <PrivateRoute element={<Moviedetails />} />,
  },
  { path: NAVIGATION_ROUTES.SEARCHLIST, element: <SearchList /> },
  { path: NAVIGATION_ROUTES.LOGIN, element: <Login /> },
];

const AppRoutes = () => {
  const routing = useRoutes(routes);

  return (
    <>
      <Navbar />
      {routing}
    </>
  );
};

export default AppRoutes;
