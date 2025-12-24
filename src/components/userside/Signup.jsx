import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    let errs = {};

    if (!formData.username?.trim()) {
      errs.username = "Username is required";
    }

    if (!formData.email?.trim()) {
      errs.email = "Email is required";
    }

    if (!formData.password?.trim()) {
      errs.password = "Password is required";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(
      (user) => user.email === formData.email.trim()
    );

    if (userExists) {
      setErrors({ email: "User already exists with this email" });
      return;
    }

    const newUser = {
      ...formData,
      id: Date.now(),
      role: "User",
      isActive: true,
      myBooks: [],
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    navigate("/login");
  };

  return (
    <>
      <div className="signup-page">
        {}
        <div className="bg-effects">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-circle circle-3"></div>
          <div className="bg-blur"></div>
        </div>

        {}
        <div className="signup-container">
          {}
          <div className="signup-card">
            {}
            <div className="signup-header">
              <div className="header-content">
                <div className="logo-section">
                  <h1 className="logo-text">Signup</h1>
                </div>
              </div>
            </div>

            {}
            <form onSubmit={handleSubmit} noValidate className="signup-form">
              {}
              <div className="form-group">
                <label className="form-label">Username :</label>
                <div className="input-container">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className={`form-input ${errors.username ? "error" : ""}`}
                    placeholder="Choose a username"
                    autoComplete="username"
                  />
                </div>
                {errors.username && (
                  <div className="error-message">{errors.username}</div>
                )}
              </div>

              {}
              <div className="form-group">
                <label className="form-label">Email Address :</label>
                <div className="input-container">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? "error" : ""}`}
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
                <label className="form-label">Password :</label>
                <div className="input-container">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`form-input ${errors.password ? "error" : ""}`}
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                  />
                </div>
                {errors.password && (
                  <div className="error-message">{errors.password}</div>
                )}
              </div>

              {}
              <button type="submit" className="submit-btn">
                Create Account
              </button>
              {}
              <div className="login-section">
                <p className="login-text">
                  Already have an account?
                  <Link to="/login" className="login-link">
                    Log In
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

export default Signup;
