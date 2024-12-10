import React, { useEffect, useState } from "react";
import "./Header.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { FaMoon, FaBars, FaTimes } from "react-icons/fa";
import logo from "../img/quickJobLogo.png";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const API_BASE_URL = "https://host-wo44.onrender.com"; // Deployed API base URL

  // Retrieve dark mode preference from localStorage
  const getInitialDarkMode = () => {
    try {
      const savedMode = JSON.parse(localStorage.getItem("darkMode"));
      return typeof savedMode === "boolean" ? savedMode : false;
    } catch (error) {
      return false;
    }
  };

  const [darkMode, setDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    const firstName = sessionStorage.getItem("firstName");
    const lastName = sessionStorage.getItem("lastName");
    const role = sessionStorage.getItem("registerAs");
    const profilePicUrl = sessionStorage.getItem("profilePic");

    if (firstName && lastName) {
      setUserName(`${firstName} ${lastName}`);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }

    if (role) {
      setUserRole(role);
    }

    if (profilePicUrl) {
      setProfilePic(`${API_BASE_URL}${profilePicUrl}`);
    }

    // Apply dark mode preference
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [location, darkMode]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    document.body.classList.toggle("dark-mode", newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setUserName("");
    setUserRole("");
    setProfilePic(null);
    navigate("/");
  };

  return (
    <header className="header">
      <div className="navbar-container">
        <img
          className="logo"
          src={logo}
          alt="QuickJob Logo"
          onClick={() => navigate("/")}
        />
        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? (
            <FaTimes className="hamburger-icon" />
          ) : (
            <FaBars className="hamburger-icon" />
          )}
        </div>

        <nav className={`navbar ${menuOpen ? "active" : ""}`}>
          <div className="navbar-links">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/register"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                {userRole === "employer" && (
                  <>
                    <Link
                      to="/AdminDashboard"
                      className="nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                    <Link
                      to="/jobPosting"
                      className="nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      Job Posting
                    </Link>
                  </>
                )}

                {userRole === "employee" && (
                  <>
                    <Link
                      to="/search"
                      className="nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      Jobs
                    </Link>
                    <Link
                      to="/jobalerts"
                      className="nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      Job Alerts
                    </Link>
                    <Link
                      to="/applicationhistory"
                      className="nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      Application History
                    </Link>
                    <Link
                      to="/savedjobs"
                      className="nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      Saved Jobs
                    </Link>
                    <Link
                      to="/PaymentGateway"
                      className="nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      Payment
                    </Link>
                    <Link
                      to="/ResumeBuilder"
                      className="nav-link"
                      onClick={() => setMenuOpen(false)}
                    >
                      ResumeBuilder
                    </Link>
                  </>
                )}

                <button
                  className="nav-link logout-button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>

        <div className="user-info">
          <div className="dark-mode-toggle" onClick={toggleDarkMode}>
            <FaMoon className={`dark-mode-icon ${darkMode ? "active" : ""}`} />
          </div>

          <div
            className="user-profile"
            onClick={() => navigate("/EmpProfUpdate")}
            style={{ cursor: "pointer" }}
          >
            <img
              src={profilePic || "https://via.placeholder.com/40"}
              alt="User"
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #ddd",
                transition: "transform 0.3s ease",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.1)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
            <span className="user-name">{userName || "Guest"}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
