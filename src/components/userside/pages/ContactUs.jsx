import React from "react";
import UserHeader from "../UserHeader";
import UserFooter from "../UserFooter";
import "./ContactUs.css";

function ContactUs({ handleUserLogout }) {
  return (
    <>
      <UserHeader onLogout={handleUserLogout} />

      {}
      <div className="contact-page">
        <div className="container">
          {/* HERO SECTION */}
          <div className="contact-hero">
            <div className="hero-container">
              <div className="hero-background"></div>
              <div className="hero-content">
                <div className="hero-text">
                  <h1 className="hero-title">Get in Touch</h1>
                  <p className="hero-subtitle">
                    We're here to help with any questions about your library
                    experience
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT CONTENT */}
          <div className="contact-container">
            <div className="contact-header">
              <h2 className="contact-main-title">Contact Us</h2>
            </div>

            <div className="contact-grid">
              {/* Contact Information Card */}
              <div className="contact-info-card">
                <div className="card-header">
                  <h3 className="card-title mx-auto">Library Information</h3>
                </div>

                <div className="contact-details">
                  <div className="detail-item">
                    <div className="detail-content">
                      <h4 className="detail-title">Address</h4>
                      <p className="detail-text">
                        Central Library, Main Street
                        <br />
                        City Center, India - 400001
                      </p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-content">
                      <h4 className="detail-title">Email</h4>
                      <p className="detail-text">
                        <a
                          href="mailto:librarysupport@example.com"
                          className="contact-link"
                        >
                          librarysupport@example.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-content">
                      <h4 className="detail-title">Phone</h4>
                      <p className="detail-text">
                        <a href="tel:+919876543210" className="contact-link">
                          +91 98765 43210
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <div className="detail-content">
                      <h4 className="detail-title">Working Hours</h4>
                      <p className="detail-text">
                        Monday – Saturday: 9:00 AM – 6:00 PM
                        <br />
                        Sunday: 10:00 AM – 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form Card */}
              <div className="contact-form-card">
                <div className="form-header">
                  <h3 className="form-title">Send us a Message</h3>
                  <p className="form-subtitle">
                    Fill out the form below and we'll get back to you within 24
                    hours
                  </p>
                </div>

                <form className="contact-form">
                  <div className="form-group">
                    <label className="form-label">Full Name :</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address :</label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject :</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Your Message :</label>
                    <textarea
                      className="form-textarea"
                      rows="5"
                      placeholder="Write your message here..."
                      required
                    ></textarea>
                  </div>

                  <div className="form-footer">
                    <button type="submit" className="submit-btn">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserFooter />
    </>
  );
}

export default ContactUs;
