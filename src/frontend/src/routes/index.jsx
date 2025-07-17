import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { authRoutes } from "./authRoutes";
import { genRoutes } from "./genRoutes";
import { userRoutes } from "./userRoutes";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {[...authRoutes, ...genRoutes, ...userRoutes]}
      </Routes>
    </Router>
  );
}

export default AppRoutes;