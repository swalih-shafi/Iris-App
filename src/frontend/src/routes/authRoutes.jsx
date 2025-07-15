import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Predict from "../pages/predict";
import Dataset from "../pages/dataset";

export const authRoutes = [
  <Route key="home" path="/home" element={<Home />} />,
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
  <Route key="predict" path="/predict" element={<Predict />} />,
  <Route key="data" path="/data" element={<Dataset />} />
];
