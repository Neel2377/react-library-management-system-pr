/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const openSidepanel = (e) => {
    e?.preventDefault();
    const panel = document.getElementById("app-sidepanel");
    panel?.classList.toggle("open");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/login");
  };

  return (
    <>
      {/* HEADER */}
      <header className="admin-header">
        <button
          className="menu-btn d-xl-none"
          onClick={openSidepanel}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <h6 className="header-title d-none d-md-block">Dashboard Overview</h6>

        <div className="profile">
          <img
            src="https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
            alt="user"
          />
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      {/* SIDEBAR */}
      <aside id="app-sidepanel" className="admin-sidebar">
        <div className="sidebar-header">
          <span>PORTAL</span>
          <button className="close-btn d-xl-none" onClick={openSidepanel}>
            ×
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/add-book">Add Book</NavLink>
          <NavLink to="/view-books">View Books</NavLink>
        </nav>
      </aside>

      {/* OVERLAY */}
      <div className="sidebar-overlay" onClick={openSidepanel} />

      {/* STYLES */}
      <style>{`
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          overflow-x: hidden;
          background: #f4f6f9;
        }

        /* HEADER */
        .admin-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.08);
          z-index: 1000;
        }

        .menu-btn {
          font-size: 22px;
          background: none;
          border: none;
        }

        .header-title {
          font-weight: 600;
        }

        .profile {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .profile img {
          width: 34px;
          height: 34px;
          border-radius: 50%;
        }

        .profile button {
          border: none;
          background: #ef4444;
          color: white;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
        }

        /* SIDEBAR */
        .admin-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100vh;
          background: #0f172a;
          color: white;
          transform: translateX(-100%);
          transition: 0.3s ease;
          z-index: 1001;
          padding-top: 60px;
        }

        .admin-sidebar.open {
          transform: translateX(0);
        }

        .sidebar-header {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 16px;
          font-weight: bold;
          background: #020617;
        }

        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 26px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          padding: 20px;
          gap: 12px;
        }

        .sidebar-nav a {
          color: #cbd5f5;
          text-decoration: none;
          padding: 10px;
          border-radius: 8px;
        }

        .sidebar-nav a.active {
          background: #22c55e;
          color: #022c22;
        }

        /* OVERLAY */
        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          opacity: 0;
          pointer-events: none;
          transition: 0.3s;
          z-index: 1000;
        }

        .admin-sidebar.open ~ .sidebar-overlay {
          opacity: 1;
          pointer-events: auto;
        }

        /* DESKTOP */
        @media (min-width: 1200px) {
          .admin-sidebar {
            transform: translateX(0);
          }

          .sidebar-overlay,
          .menu-btn,
          .close-btn {
            display: none;
          }

          .admin-header {
            left: 250px;
          }

          .app-wrapper {
            margin-left: 250px;
            padding-top: 60px;
          }
        }

        /* MOBILE */
        @media (max-width: 1199px) {
          .app-wrapper {
            margin-left: 0;
            padding-top: 60px;
          }
        }
      `}</style>
    </>
  );
}

export default Header;
