import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let errs = {};

    if (!formData.email?.trim()) {
      errs.email = "Email is required";
    }

    if (!formData.password?.trim()) {
      errs.password = "Password is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (!users.length) {
      alert("No account found. Please sign up first.");
      navigate("/signup");
      return;
    }

    const user = users.find(
      (u) =>
        u.email === formData.email.trim() &&
        u.password === formData.password.trim()
    );

    if (!user) {
      setErrors({
        email: "Invalid email or password",
        password: "Invalid email or password",
      });
      return;
    }

    localStorage.setItem("isAuth", "true");
    localStorage.setItem("currentUser", JSON.stringify(user));
    navigate("/");
  };

  return (
    <>
      <div className="login-page">
        {}
        <div className="bg-decoration">
          <div className="bg-shape shape-1"></div>
          <div className="bg-shape shape-2"></div>
          <div className="bg-shape shape-3"></div>
        </div>

        {}
        <div className="login-container">
          <div className="login-card">
            {}
            <div className="login-header">
              <div className="logo-container">
                <h1 className="logo-text">Login</h1>
              </div>
            </div>

            {}
            <form onSubmit={handleSubmit} noValidate className="login-form">
              {}
              <div className="form-group">
                <label className="form-label">Email Address :</label>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    className={`form-input ${errors.email ? "error" : ""}`}
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    autoComplete="email"
                  />
                </div>
                {errors.email && (
                  <div className="error-message">{errors.email}</div>
                )}
              </div>

              {}
              <div className="form-group">
                <div className="label-row">
                  <label className="form-label">Password :</label>
                </div>
                <div className="input-container">
                  <input
                    type="password"
                    name="password"
                    className={`form-input ${errors.password ? "error" : ""}`}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              {}
              <button type="submit" className="submit-btn">
                Log In
              </button>

              {}
              <div className="signup-section">
                <p className="signup-text">
                  Don't have an account?
                  <Link to="/signup" className="signup-link">
                    Create Account
                  </Link>
                </p>
                <p className="admin-text">
                  Are you an admin?
                  <Link to="/admin-login" className="admin-link">
                    Admin Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
