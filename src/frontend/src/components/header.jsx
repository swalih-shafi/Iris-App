import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaSeedling } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "../styles/header.css";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  return (
    <header className="header">
      <div className="logo-section">
        <FaSeedling className="logo-icon" />
        <span className="app-name">IRIS</span>
      </div>

      <nav className="nav-links">
        <Link to="/predict">PREDICT</Link>
        {isLoggedIn ? (
          <>
            <Link to="/history">HISTORY</Link>
            <FaUserCircle className="user-icon" />
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
