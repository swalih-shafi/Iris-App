import { Route } from "react-router-dom";
import Home from "../pages/home";
import History from "../pages/history";
import Details from "../pages/details";

export const userRoutes = [
  <Route key="home" path="/home" element={<Home />} />,
  <Route key="history" path="/history" element={<History />} />,
  <Route key="details" path="/details" element={<Details />} />,
];