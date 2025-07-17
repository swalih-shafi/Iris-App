import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaSeedling } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import { FaUser, FaHistory, FaInfoCircle, FaSignOutAlt, FaHome } from "react-icons/fa";

const AuthHeader = () => {
  const navigate = useNavigate();
  

    return (
    <header className="header">
      <div className="logo-section" onClick={() => navigate('/')}>
        <FaSeedling className="logo-icon" />
        <span className="app-name">IRIS</span>
      </div>

      <nav className="nav-links">
          <>
            <div className="auth-buttons">
              <Link to="/register" className="auth-btn primary">
                Get Started
              </Link>
              <Link to="/login" className="auth-btn secondary">
                Login
              </Link>
            </div>
          </>
      </nav>
    </header>
  );
};

export default AuthHeader;
