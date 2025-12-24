import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./UserHeader.css";

function UserHeader({ onLogout }) {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const updateUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(updatedUser);
    };

    window.addEventListener("profileUpdated", updateUser);
    window.addEventListener("storage", updateUser);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".mobile-menu-toggle")
      ) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      window.removeEventListener("profileUpdated", updateUser);
      window.removeEventListener("storage", updateUser);
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const userName = currentUser?.name || currentUser?.username || "User";
  const userImage =
    currentUser?.image ||
    "https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png";

  return (
    <>
      <nav className="user-header justify-content-between">
        <div className="header-container">
          {}
          <button
            className={`mobile-menu-toggle ${mobileMenuOpen ? "open" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>

          {}
          <div className="header-brand">
            <NavLink to="/" className="brand-link">
              <div className="brand-content">
                <span className="brand-logo fs-1">📚</span>
                <span className="brand-text">Digital Library</span>
              </div>
            </NavLink>
          </div>

          {}
          <div className="header-nav js">
            <ul className="nav-menu">
              <li className="nav-item">
                <NavLink
                  to="/"
                  className="nav-link"
                  end
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="link-text">Home</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/my-books"
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="link-text">My Books</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/aboutus"
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="link-text">About</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contactus"
                  className="nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="link-text">Contact</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {}
          <div className="header-profile" ref={dropdownRef}>
            <div className="profile-dropdown">
              <button
                className="profile-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div
                  className="profile-avatar"
                  style={{ height: "40px", width: "40px" }}
                >
                  <img src={userImage} alt="User" className="avatar-image" />
                  {isAuth && <div className="online-indicator"></div>}
                </div>
                {isAuth && (
                  <div className="profile-info">
                    <span className="welcome-text">Welcome back,</span>
                    <span className="user-name">{userName}</span>
                  </div>
                )}
                <span
                  className={`dropdown-arrow ${dropdownOpen ? "open" : ""}`}
                >
                  ⌄
                </span>
              </button>

              <div className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
                {isAuth && currentUser ? (
                  <>
                    <div className="dropdown-header">
                      <div className="header-avatar">
                        <img
                          src={userImage}
                          alt="User"
                          className="header-avatar-image"
                        />
                      </div>
                      <div className="header-info">
                        <div className="header-name">{userName}</div>
                        <div className="header-email">
                          {currentUser.email || "User"}
                        </div>
                      </div>
                    </div>

                    <div className="dropdown-divider"></div>

                    <NavLink
                      to="/myprofile"
                      className="dropdown-item"
                      onClick={() => {
                        setDropdownOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="item-text">My Profile</span>
                    </NavLink>

                    <NavLink
                      to="/my-books"
                      className="dropdown-item text-black"
                      onClick={() => {
                        setDropdownOpen(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <span className="item-text">My Library</span>
                      {Array.isArray(currentUser.myBooks) &&
                        currentUser.myBooks.length > 0 && (
                          <span className="item-badge">
                            {currentUser.myBooks.length}
                          </span>
                        )}
                    </NavLink>

                    <div className="dropdown-divider"></div>

                    <button
                      className="dropdown-item logout-item"
                      onClick={() => {
                        setDropdownOpen(false);
                        setMobileMenuOpen(false);
                        onLogout();
                      }}
                    >
                      <span className="item-text">Logout</span>
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="dropdown-item"
                    onClick={() => {
                      setDropdownOpen(false);
                      setMobileMenuOpen(false);
                    }}
                  >
                    <span className="item-text">Sign In</span>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>

        {}
        <div
          className={`mobile-nav-menu ${mobileMenuOpen ? "show" : ""}`}
          ref={mobileMenuRef}
        >
          <div className="mobile-nav-header">
            <div className="mobile-user-info">
              <div className="mobile-avatar">
                <img src={userImage} alt="User" />
                {isAuth && <div className="mobile-online-indicator"></div>}
              </div>
              <div className="mobile-user-details">
                <span className="mobile-user-name">{userName}</span>
                {currentUser?.email && (
                  <span className="mobile-user-email">{currentUser.email}</span>
                )}
              </div>
            </div>
          </div>

          <ul className="mobile-nav-links">
            <li className="mobile-nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
                end
                onClick={toggleMobileMenu}
              >
                <span className="mobile-link-text">Home</span>
              </NavLink>
            </li>

            <li className="mobile-nav-item">
              <NavLink
                to="/my-books"
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
                onClick={toggleMobileMenu}
              >
                <span className="mobile-link-text">My Books</span>
              </NavLink>
            </li>

            <li className="mobile-nav-item">
              <NavLink
                to="/aboutus"
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
                onClick={toggleMobileMenu}
              >
                <span className="mobile-link-text">About</span>
              </NavLink>
            </li>

            <li className="mobile-nav-item">
              <NavLink
                to="/contactus"
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
                onClick={toggleMobileMenu}
              >
                <span className="mobile-link-text">Contact</span>
              </NavLink>
            </li>

            <li className="mobile-nav-item">
              <NavLink
                to="/myprofile"
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
                onClick={toggleMobileMenu}
              >
                <span className="mobile-link-text">My Profile</span>
              </NavLink>
            </li>

            <li className="mobile-nav-item">
              <NavLink
                to="/my-books"
                className={({ isActive }) =>
                  `mobile-nav-link ${isActive ? "active" : ""}`
                }
                onClick={toggleMobileMenu}
              >
                <span className="mobile-link-text">My Library</span>
                {Array.isArray(currentUser?.myBooks) &&
                  currentUser.myBooks.length > 0 && (
                    <span className="mobile-item-badge">
                      {currentUser.myBooks.length}
                    </span>
                  )}
              </NavLink>
            </li>

            <li className="mobile-nav-item">
              {isAuth ? (
                <button
                  className="mobile-nav-link mobile-logout"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onLogout();
                  }}
                >
                  <span className="mobile-link-text">Logout</span>
                </button>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `mobile-nav-link ${isActive ? "active" : ""}`
                  }
                  onClick={toggleMobileMenu}
                >
                  <span className="mobile-link-text">Sign In</span>
                </NavLink>
              )}
            </li>
          </ul>
        </div>

        {}
        <div
          className={`mobile-menu-overlay ${mobileMenuOpen ? "show" : ""}`}
          onClick={toggleMobileMenu}
        />
      </nav>
    </>
  );
}

export default UserHeader;
