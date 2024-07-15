import React from "react";
import { useRoutes } from "react-router-dom";
import { NAVIGATION_ROUTES } from "./routes.constant";
import Dashboard from "src/pages/Dashboard";
import Moviedetails from "src/pages/Moviedetails";

import SearchList from "../pages/SearchList";
import Navbar from "../components/Navbar";

const routes = [
  { path: NAVIGATION_ROUTES.DASHBOARD, element: <Dashboard /> },
  { path: NAVIGATION_ROUTES.MOVIEDETAILS, element: <Moviedetails /> },
  { path: NAVIGATION_ROUTES.SEARCHLIST, element: <SearchList /> },
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
