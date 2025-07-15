import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { authRoutes } from "./authRoutes";

function AppRoutes() {
  return (
    <Router>
      <Routes>{authRoutes}</Routes>
    </Router>
  );
}

export default AppRoutes;
