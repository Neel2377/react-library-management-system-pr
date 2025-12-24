import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let errs = {};

    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address";
    }

    if (!form.password.trim()) {
      errs.password = "Password is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    if (form.email === "admin@gmail.com" && form.password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/admin");
    } else {
      setErrors({
        email: "Invalid admin credentials",
        password: "Invalid admin credentials",
      });
    }

    setIsLoading(false);
  };

  return (
    <>
      <div className="admin-login-page">
        {}
        <div className="admin-bg-effects">
          <div className="admin-bg-shape shape-1"></div>
          <div className="admin-bg-shape shape-2"></div>
          <div className="admin-bg-shape shape-3"></div>
          <div className="admin-bg-grid"></div>
        </div>

        {}
        <div className="admin-login-container">
          {}
          <div className="admin-login-card">
            {}
            <div className="admin-header">
              <div className="admin-title-section">
                <h1 className="admin-title">Admin Login</h1>
              </div>
            </div>

            {}
            <form
              onSubmit={handleSubmit}
              noValidate
              className="admin-login-form"
            >
              {}
              <div className="form-group">
                <label className="form-label">Admin Email :</label>
                <div className="input-container">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    value={form.email}
                    onChange={handleChange}
                    placeholder="admin@gmail.com"
                    disabled={isLoading}
                  />
                </div>
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              {}
              <div className="form-group">
                <label className="form-label">Admin Password :</label>
                <div className="input-container">
                  <input
                    id="password"
                    type="password"
                    name="password"
                    className={`form-input ${errors.password ? "error" : ""}`}
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter admin password"
                    disabled={isLoading}
                  />
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              {}
              <button
                type="submit"
                className="admin-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Authenticating...
                  </>
                ) : (
                  <>Access Admin Dashboard</>
                )}
              </button>
              <div className="password-note">
                Default: admin@gmail.com / admin123
              </div>
              {}
              <div className="back-section">
                <NavLink to="/login" className="back-link">
                  <span className="back-icon">←</span>
                  Return to User Login
                </NavLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin;
