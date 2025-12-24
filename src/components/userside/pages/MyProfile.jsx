/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyProfile.css";

function MyProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    image: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser) {
      setUser(storedUser);
      setForm({
        username: storedUser.username || "",
        email: storedUser.email || "",
        image: storedUser.image || "",
      });
    }
  }, []);

  if (!user) {
    return (
      <div className="container mt-5 text-center">
        <h4>Please login to view your profile</h4>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      username: form.username,
      name: form.name,
      email: form.email,
      image: form.image,
    };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.id === updatedUser.id ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    setUser(updatedUser);
    setEditMode(false);

    window.dispatchEvent(new Event("profileUpdated"));

    navigate("/");
  };

  const handleCancel = () => {
    setForm({
      username: user.username || "",
      email: user.email || "",
      image: user.image || "",
    });
    setEditMode(false);
  };

  return (
    <>
      <div className="container mt-3 mb-3">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="profile-card">
              <div className="card-header pt-0">
                <div className="header-content">
                  <div className="profile-icon">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <h3 className="card-title">Profile Settings</h3>
                  <p className="card-subtitle text-white">
                    Manage your account information
                  </p>
                </div>
              </div>

              <div className="card-body pt-3">
                {}
                <div className="avatar-section">
                  <div className="avatar-wrapper">
                    <img
                      src={
                        form.image ||
                        "https://a0.anyrgb.com/pngimg/1140/162/user-profile-login-avatar-heroes-user-blue-icons-circle-symbol-logo.png"
                      }
                      alt="Profile"
                      className="profile-avatar"
                    />
                    {editMode && (
                      <label className="avatar-upload-btn">
                        <i className="fas fa-camera"></i>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          hidden
                        />
                      </label>
                    )}
                  </div>
                </div>

                {}
                <div className="form-group">
                  <div className="form-label-wrapper">
                    <i className="fas fa-user"></i>
                    <label className="form-label">Username</label>
                  </div>
                  {editMode ? (
                    <input
                      type="text"
                      name="username"
                      className="form-input"
                      value={form.username}
                      onChange={handleChange}
                      placeholder="Enter username"
                    />
                  ) : (
                    <div className="display-field">
                      <span>{user.username}</span>
                      <i className="fas fa-pen edit-icon"></i>
                    </div>
                  )}
                </div>

                {}
                <div className="form-group">
                  <div className="form-label-wrapper">
                    <i className="fas fa-envelope"></i>
                    <label className="form-label">Email Address</label>
                  </div>
                  {editMode ? (
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Enter email"
                    />
                  ) : (
                    <div className="display-field">
                      <span>{user.email}</span>
                      <i className="fas fa-pen edit-icon"></i>
                    </div>
                  )}
                </div>

                {}
                <div className="action-buttons">
                  {editMode ? (
                    <>
                      <button className="btn btn-save" onClick={handleSave}>
                        <i className="fas fa-check"></i>
                        Save Changes
                      </button>
                      <button className="btn btn-cancel" onClick={handleCancel}>
                        <i className="fas fa-times"></i>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      className="btn btn-edit"
                      onClick={() => setEditMode(true)}
                    >
                      <i className="fas fa-edit"></i>
                      Edit Profile
                    </button>
                  )}
                  {}
                  <button
                    className="btn btn-home"
                    onClick={() => navigate("/")}
                  >
                    <i className="fas fa-home"></i>
                    Home
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyProfile;
