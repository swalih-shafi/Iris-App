import "./App.css";
import AppRoutes from "./routes";import { useEffect } from "react";

function App() {
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")}/`)
      .then((res) => console.log("Backend pinged:", res.status))
      .catch((err) => console.error("Backend ping failed:", err));
  }, []);

  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
