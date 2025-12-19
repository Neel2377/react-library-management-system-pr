import React, { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";

function UserHeader({ onLogout }) {
  const isAuth = localStorage.getItem("isAuth") === "true";
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateUser = () => {
      const updatedUser = JSON.parse(localStorage.getItem("currentUser"));
      setCurrentUser(updatedUser);
    };

    window.addEventListener("profileUpdated", updateUser);
    window.addEventListener("storage", updateUser);

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("profileUpdated", updateUser);
      window.removeEventListener("storage", updateUser);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const userName = currentUser?.name || currentUser?.username || "User";
  const userImage =
    currentUser?.image ||
    "https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png";

  return (
    <>
      <nav className="user-header">
        <div className="header-container">
          {/* Logo/Brand Section */}
          <div className="header-brand">
            <NavLink to="/" className="brand-link">
              <div className="brand-content">
                <span className="brand-logo fs-1">📚</span>
                <span className="brand-text">Digital Library</span>
              </div>
            </NavLink>
          </div>

          {/* Navigation Links */}
          <div className="header-nav">
            <ul className="nav-menu">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" end>
                  <span className="link-icon">🏠</span>
                  <span className="link-text">Home</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/my-books" className="nav-link">
                  <span className="link-icon">📖</span>
                  <span className="link-text">My Books</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/aboutus" className="nav-link">
                  <span className="link-icon">ℹ️</span>
                  <span className="link-text">About</span>
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink to="/contactus" className="nav-link">
                  <span className="link-icon">📞</span>
                  <span className="link-text">Contact</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {/* User Profile Section */}
          <div className="header-profile" ref={dropdownRef}>
            <div className="profile-dropdown">
              <button
                className="profile-trigger"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <div className="profile-avatar">
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
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="item-icon">👤</span>
                      <span className="item-text">My Profile</span>
                    </NavLink>

                    <NavLink
                      to="/my-books"
                      className="dropdown-item text-black"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <span className="item-icon">📚</span>
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
                        onLogout();
                      }}
                    >
                      <span className="item-icon">🚪</span>
                      <span className="item-text">Logout</span>
                    </button>
                  </>
                ) : (
                  <NavLink
                    to="/login"
                    className="dropdown-item"
                    onClick={() => setDropdownOpen(false)}
                  >
                    <span className="item-icon">🔑</span>
                    <span className="item-text">Sign In</span>
                  </NavLink>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <style>{`
        /* =====================
           GLOBAL STYLES
        ===================== */
        :root {
          --primary-color: #6366f1;
          --primary-light: #818cf8;
          --primary-dark: #4f46e5;
          --secondary-color: #f1f5f9;
          --text-color: #1e293b;
          --text-light: #64748b;
          --success-color: #10b981;
          --danger-color: #ef4444;
          --card-bg: #ffffff;
          --shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          --shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.12);
          --radius: 12px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* =====================
           HEADER CONTAINER
        ===================== */
        .user-header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          z-index: 1000;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          animation: slideDown 0.4s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .header-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 70px;
        }

        /* =====================
           BRAND SECTION
        ===================== */
        .header-brand {
          flex-shrink: 0;
        }

        .brand-link {
          text-decoration: none;
          display: inline-block;
          transition: var(--transition);
        }

        .brand-link:hover {
          transform: translateY(-2px);
        }

        .brand-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .brand-icon {
          font-size: 1.8rem;
          color: var(--primary-color);
        }

        .brand-text {
          font-size: 1.5rem;
          font-weight: 800;
          color: var(--text-color);
          letter-spacing: -0.5px;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* =====================
           NAVIGATION MENU
        ===================== */
        .header-nav {
          flex: 1;
          display: flex;
          justify-content: center;
        }

        @media (max-width: 992px) {
          .header-nav {
            display: none;
          }
        }

        .nav-menu {
          display: flex;
          gap: 0.5rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          text-decoration: none;
          color: var(--text-light);
          font-weight: 600;
          font-size: 0.95rem;
          border-radius: var(--radius);
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }

        .nav-link:hover {
          color: var(--primary-color);
          background: rgba(99, 102, 241, 0.05);
        }

        .nav-link.active {
          color: var(--primary-color);
          background: rgba(99, 102, 241, 0.1);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 3px;
          background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
          border-radius: 2px;
        }

        .link-icon {
          font-size: 1.1rem;
        }

        .link-text {
          font-size: 0.9rem;
        }

        /* =====================
           PROFILE SECTION
        ===================== */
        .header-profile {
          flex-shrink: 0;
        }

        .profile-dropdown {
          position: relative;
        }

        .profile-trigger {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.5rem;
          border: none;
          background: none;
          cursor: pointer;
          border-radius: 50px;
          transition: var(--transition);
        }

        .profile-trigger:hover {
          background: var(--secondary-color);
        }

        .profile-avatar {
          position: relative;
          width: 40px;
          height: 40px;
        }

        .avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: var(--transition);
        }

        .profile-trigger:hover .avatar-image {
          transform: scale(1.05);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .online-indicator {
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          background: var(--success-color);
          border: 2px solid white;
          border-radius: 50%;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        @media (max-width: 768px) {
          .profile-info {
            display: none;
          }
        }

        .welcome-text {
          font-size: 0.75rem;
          color: var(--text-light);
        }

        .user-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--text-color);
          max-width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .dropdown-arrow {
          font-size: 1.2rem;
          color: var(--text-light);
          transition: var(--transition);
        }

        .dropdown-arrow.open {
          transform: rotate(180deg);
          color: var(--primary-color);
        }

        /* =====================
           DROPDOWN MENU
        ===================== */
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 280px;
          background: var(--card-bg);
          border-radius: var(--radius);
          box-shadow: var(--shadow-hover);
          padding: 1rem 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: var(--transition);
          z-index: 1000;
          display: block !important; /* Override any inline styles */
        }

        .dropdown-menu.show {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0 1rem 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .header-avatar {
          width: 50px;
          height: 50px;
        }

        .header-avatar-image {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid var(--secondary-color);
        }

        .header-info {
          flex: 1;
        }

        .header-name {
          font-size: 1rem;
          font-weight: 700;
          color: var(--text-color);
          margin-bottom: 0.25rem;
        }

        .header-email {
          font-size: 0.85rem;
          color: var(--text-light);
        }

        .dropdown-divider {
          height: 1px;
          background: #e2e8f0;
          margin: 0.75rem 0;
        }

        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          text-decoration: none;
          color: var(--text-color);
          font-size: 0.9rem;
          font-weight: 500;
          transition: var(--transition);
          border: none;
          background: none;
          width: 100%;
          cursor: pointer;
          text-align: left;
        }

        .dropdown-item:hover {
          background: rgba(99, 102, 241, 0.05);
          color: var(--primary-color);
        }

        .item-icon {
          font-size: 1.1rem;
          width: 20px;
          text-align: center;
        }

        .item-text {
          flex: 1;
        }

        .item-badge {
          background: var(--primary-color);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.1rem 0.5rem;
          border-radius: 10px;
          min-width: 24px;
          text-align: center;
        }

        .logout-item {
          color: var(--danger-color) !important;
        }

        .logout-item:hover {
          background: rgba(239, 68, 68, 0.05) !important;
        }

        /* =====================
           RESPONSIVE DESIGN
        ===================== */
        @media (max-width: 1200px) {
          .header-container {
            padding: 0 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 1rem;
            height: 60px;
          }
          
          .brand-text {
            font-size: 1.3rem;
          }
          
          .brand-icon {
            font-size: 1.5rem;
          }
          
          .profile-avatar {
            width: 36px;
            height: 36px;
          }
          
          .dropdown-menu {
            width: 250px;
          }
        }

        @media (max-width: 576px) {
          .header-container {
            padding: 0 0.75rem;
          }
          
          .brand-text {
            font-size: 1.2rem;
          }
          
          .dropdown-menu {
            right: -50%;
            width: 200px;
          }
        }

        /* =====================
           REDUCED MOTION
        ===================== */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default UserHeader;
