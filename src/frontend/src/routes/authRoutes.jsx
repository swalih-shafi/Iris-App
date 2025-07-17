import { Route } from "react-router-dom";
import Login from "../pages/login";
import Register from "../pages/register";

export const authRoutes = [
  <Route key="login" path="/login" element={<Login />} />,
  <Route key="register" path="/register" element={<Register />} />,
];
