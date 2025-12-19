/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate, NavLink, useLocation } from "react-router";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isSearchEnabled = location.pathname === "/view-books";

  const openSidepanel = (e) => {
    e?.preventDefault();
    const panel = document.getElementById("app-sidepanel");
    if (!panel) return;
    panel.classList.toggle("sidepanel-visible");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    navigate("/admin-login");
  };

  return (
    <>
      <header className="app-header fixed-top">
        <div className="app-header-inner">
          <div className="container-fluid py-2">
            <div className="app-header-content">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto">
                  <NavLink
                    id="sidepanel-toggler"
                    className="sidepanel-toggler d-inline-block d-xl-none text-dark p-2"
                    to="#"
                    onClick={openSidepanel}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={30}
                      height={30}
                      viewBox="0 0 30 30"
                      role="img"
                    >
                      <title>Menu</title>
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit={10}
                        strokeWidth={2}
                        d="M4 7h22M4 15h22M4 23h22"
                      />
                    </svg>
                  </NavLink>
                </div>

                <div className="app-utilities col-auto">
                  <div className="app-utility-item app-user-dropdown dropdown">
                    <button
                      className="bg-transparent border-0 p-0 d-flex align-items-center"
                      id="user-dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src="https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
                        alt="User profile"
                        width="32"
                        height="32"
                        className="rounded-circle me-3"
                      />
                    </button>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="user-dropdown-toggle"
                    >
                      <li>
                        <NavLink
                          className="dropdown-item fw-bold"
                          to="/login"
                          onClick={handleLogout}
                        >
                          Log Out
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="app-sidepanel" className="app-sidepanel">
          <div id="sidepanel-drop" className="sidepanel-drop" />
          <div className="sidepanel-inner d-flex flex-column">
            <NavLink
              to="#"
              id="sidepanel-close"
              className="sidepanel-close d-xl-none"
              onClick={openSidepanel}
            >
              ×
            </NavLink>
            <div className="app-branding">
              <NavLink className="app-logo" to="/admin">
                <img
                  className="logo-icon"
                  src="assets/images/app-logo.svg"
                  alt="logo"
                />
                <span className="logo-text">PORTAL</span>
              </NavLink>
            </div>
            {}
            <nav id="app-nav-main" className="app-nav app-nav-main flex-grow-1">
              <ul
                className="app-menu list-unstyled accordion"
                id="menu-accordion"
              >
                <li className="nav-item">
                  {}
                  <NavLink className="nav-link" to="/admin">
                    <span className="nav-icon">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-house-door"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.646 1.146a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 .146.354v7a.5.5 0 0 1-.5.5H9.5a.5.5 0 0 1-.5-.5v-4H7v4a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .146-.354l6-6zM2.5 7.707V14H6v-4a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4h3.5V7.707L8 2.207l-5.5 5.5z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M13 2.5V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                        />
                      </svg>
                    </span>
                    <span className="nav-link-text">Dashboard</span>
                  </NavLink>
                  {}
                </li>
                {}
                <li className="nav-item">
                  {}
                  <NavLink className="nav-link" to="/add-book">
                    <span className="nav-icon">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-folder"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.828 4a3 3 0 0 1-2.12-.879l-.83-.828A1 1 0 0 0 6.173 2H2.5a1 1 0 0 0-1 .981L1.546 4h-1L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3v1z" />
                        <path
                          fillRule="evenodd"
                          d="M13.81 4H2.19a1 1 0 0 0-.996 1.09l.637 7a1 1 0 0 0 .995.91h10.348a1 1 0 0 0 .995-.91l.637-7A1 1 0 0 0 13.81 4zM2.19 3A2 2 0 0 0 .198 5.181l.637 7A2 2 0 0 0 2.826 14h10.348a2 2 0 0 0 1.991-1.819l.637-7A2 2 0 0 0 13.81 3H2.19z"
                        />
                      </svg>
                    </span>
                    <span className="nav-link-text">Add Book</span>
                  </NavLink>
                  {}
                </li>
                {}
                <li className="nav-item">
                  {}
                  <NavLink className="nav-link" to="/view-books">
                    <span className="nav-icon">
                      <svg
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        className="bi bi-card-list"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14.5 3h-13a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"
                        />
                        <path
                          fillRule="evenodd"
                          d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z"
                        />
                        <circle cx="3.5" cy="5.5" r=".5" />
                        <circle cx="3.5" cy={8} r=".5" />
                        <circle cx="3.5" cy="10.5" r=".5" />
                      </svg>
                    </span>
                    <span className="nav-link-text">View Books</span>
                  </NavLink>
                  {}
                </li>
              </ul>
              {}
            </nav>
            {}
          </div>
          {}
        </div>
        {}
      </header>
      {}
      <style>{`
          /* =====================
   Header Base
===================== */

.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.06);
  z-index: 1030;
  padding-top:;
}

.app-header-inner,
.app-header-content {
  overflow: visible;
}

.app-header-content {
  animation: headerFade 0.35s ease;
}

@keyframes headerFade {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* =====================
   Sidebar Toggle
===================== */

.sidepanel-toggler {
  border-radius: 10px;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

@media (hover: hover) {
  .sidepanel-toggler:hover {
    background-color: #f1f5f9;
    transform: scale(1.05);
  }
}

/* =====================
   User Dropdown
===================== */

.app-user-dropdown {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
}

.app-user-dropdown button {
  background: transparent;
  border: none;
  padding: 0;
}

/* Avatar */
.app-user-dropdown img {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #e5e7eb;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

@media (hover: hover) {
  .app-user-dropdown img:hover {
    transform: scale(1.12);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  }
}

/* Dropdown menu */
.app-user-dropdown .dropdown-menu {
  border-radius: 14px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
  padding: 2px 0px;
  font-size: 0.85rem;
  min-width: 180px;
}

/* Dropdown items base */
.app-user-dropdown .dropdown-item {
  margin: 3px;
  padding: 9px 10px;
  border-radius: 10px;
  font-weight: 500;
  color: #334155;
  transition: background-color 0.3s ease, color 0.2s ease,
    transform 0.15s ease;
}

/* Normal hover */
@media (hover: hover) {
  .app-user-dropdown .dropdown-item:hover {
    background-color: #f1f5f9;
    transform: translateX(4px);
  }
}

/* =====================
   Logout Hover (Danger)
===================== */

@media (hover: hover) {
  .app-user-dropdown .dropdown-item:hover[href*="login"],
  .app-user-dropdown .dropdown-item:hover[role="menuitem"] {
    background-color: #fee2e2;
    color: #b91c1c;
  }
}

.app-user-dropdown .dropdown-item:active,
.app-user-dropdown .dropdown-item:focus {
  background-color: #fecaca;
  color: #991b1b;
}

/* =====================
   Sidebar Inner
===================== */

.sidepanel-inner {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  animation: slideIn 0.35s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(-12px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Close button */
.sidepanel-close {
  position: absolute;
  top: 12px;
  right: 16px;
  font-size: 40px !important;
  font-weight: bold;
  color: #ffffff !important;
  cursor: pointer;
  z-index: 10;
}

@media (hover: hover) {
  .sidepanel-close:hover {
    opacity: 0.75;
  }
}

/* =====================
   Branding
===================== */

.app-branding {
  padding: 0 22px 16px;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 14px;
}

.app-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  color: #0f172a;
  text-decoration: none;
}

.logo-icon {
  width: 28px;
  height: 28px;
}

/* =====================
   Navigation Menu
===================== */

.app-nav {
  padding-top: 10px;
}

.app-menu {
  padding: 0;
  margin: 0;
}

.nav-item {
  margin: 4px 0;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 22px;
  border-radius: 14px;
  color: #334155;
  font-size: 0.9rem;
  text-decoration: none;
  transition: background-color 0.2s ease, transform 0.15s ease;
}

.nav-icon {
  font-size: 1rem;
}

@media (hover: hover) {
  .nav-link:hover {
    background-color: #f1f5f9;
    transform: translateX(6px);
  }
}

.nav-link.active {
  background-color: #ecfdf5;
  color: #047857;
  font-weight: 600;
}

/* =====================
   Desktop Layout
===================== */

@media (min-width: 1200px) {
  .app-sidepanel {
    transform: translateX(0);
  }

  .sidepanel-toggler {
    display: none;
  }
}

/* =====================
   Mobile
===================== */

@media (max-width: 576px) {
  .app-logo {
    font-size: 1rem;
  }

  .nav-link {
    font-size: 0.85rem;
  }
}

/* =====================
   Accessibility  
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

export default Header;
