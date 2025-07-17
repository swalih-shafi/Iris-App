import { useEffect, useState, useRef } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaSeedling } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import {
  FaUser,
  FaHistory,
  FaInfoCircle,
  FaSignOutAlt,
  FaHome,
} from "react-icons/fa";
import { SlArrowDown } from "react-icons/sl";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const data = localStorage.getItem("token");
    const parsed =
      localStorage.length && JSON.parse(JSON.stringify(localStorage));
    setIsLoggedIn(!!data);
    if (parsed && parsed.username) {
      setUsername(parsed.username);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="logo-section" onClick={() => navigate('/')}>
        <FaSeedling className="logo-icon" />
        <span className="app-name">IRIS</span>
      </div>

      <nav className="nav-links">
        <Link to="/predict">CLASSIFY</Link>
        <Link to="/data">DATASET</Link>

        {!isLoggedIn ? (
          <>
            <div className="auth-buttons">
              <Link to="/register" className="auth-btn primary">
                Get Started
              </Link>
              <Link to="/login" className="auth-btn">
                Login
              </Link>
            </div>
          </>
        ) : (
          <div
            className="user-dropdown-wrapper"
            onClick={toggleDropdown}
            ref={dropdownRef}
          >
            <FaUserCircle className="user-icon" />
            <Link className="user-name">{username}</Link>
            <SlArrowDown style={{ color: "white", fontSize: "0.8rem" }} />
            {dropdownOpen && (
              <div className="user-dropdown">
                <div className="dropdown-username">Hello, {username}!</div>
                <div
                  className="dropdown-item"
                  onClick={() => navigate("/home")}
                >
                  <FaHome className="dropdown-icon" />
                  Home
                </div>
                <div
                  className="dropdown-item"
                  onClick={() => navigate("/history")}
                >
                  <FaHistory className="dropdown-icon" />
                  History
                </div>
                {/* <div
                  className="dropdown-item"
                  onClick={() => navigate("/details")}
                >
                  <FaInfoCircle className="dropdown-icon" />
                  Details
                </div> */}
                <div className="dropdown-item logout" onClick={handleLogout}>
                  <FaSignOutAlt className="dropdown-icon" />
                  Log Out
                </div>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
