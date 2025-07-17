import { Route } from "react-router-dom";
import Landing from "../pages/landing";
import Predict from "../pages/predict";
import Dataset from "../pages/dataset";

export const genRoutes = [
  <Route key="landing" path="/" element={<Landing />} />,
  <Route key="predict" path="/predict" element={<Predict />} />,
  <Route key="data" path="/data" element={<Dataset />} />,
];
