import { NavLink } from "react-router-dom";
import "./UserFooter.css";

function UserFooter() {
  return (
    <>
      <footer className="library-footer">
        <div className="footer-container">
          {}
          <div className="footer-left">
            <div className="brand-container">
              <div className="brand-icon">📚</div>
              <div className="brand-content">
                <h4 className="brand-title">Digital Library Hub</h4>
                <p className="brand-description">
                  Manage books, members, and records efficiently with our modern
                  platform.
                </p>
              </div>
            </div>

            <div className="social-container">
              <div className="social-title">Follow Us</div>
              <div className="social-icons">
                <NavLink to="#" className="social-link" aria-label="Facebook">
                  <i className="fab fa-facebook-f social-icon"></i>
                </NavLink>

                <NavLink to="#" className="social-link" aria-label="Twitter">
                  <i className="fab fa-twitter social-icon"></i>
                </NavLink>

                <NavLink to="#" className="social-link" aria-label="Instagram">
                  <i className="fab fa-instagram social-icon"></i>
                </NavLink>

                <NavLink to="#" className="social-link" aria-label="LinkedIn">
                  <i className="fab fa-linkedin social-icon"></i>
                </NavLink>
              </div>
            </div>
          </div>

          {}
          <div className="footer-center">
            <div className="links-header">
              <h4 className="links-title">Quick Links</h4>
            </div>
            <ul className="links-list">
              <li className="link-item">
                <NavLink to="/" className="footer-link">
                  <span className="link-bullet">•</span>
                  <span className="link-text">Home</span>
                </NavLink>
              </li>

              <li className="link-item">
                <NavLink to="/aboutus" className="footer-link">
                  <span className="link-bullet">•</span>
                  <span className="link-text">About Us</span>
                </NavLink>
              </li>

              <li className="link-item">
                <NavLink to="/contactus" className="footer-link">
                  <span className="link-bullet">•</span>
                  <span className="link-text">Contact</span>
                </NavLink>
              </li>

              <li className="link-item">
                <NavLink to="/my-books" className="footer-link">
                  <span className="link-bullet">•</span>
                  <span className="link-text">My Books</span>
                </NavLink>
              </li>
            </ul>
          </div>

          {}
          <div className="footer-right">
            <div className="contact-header">
              <h4 className="contact-title">Contact Info</h4>
            </div>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-type">Email</div>
                <NavLink
                  to="mailto:library@example.com"
                  className="contact-value"
                >
                  library@example.com
                </NavLink>
              </div>

              <div className="contact-item">
                <div className="contact-type">Phone</div>
                <NavLink to="tel:+919876543210" className="contact-value">
                  +91 98765 43210
                </NavLink>
              </div>

              <div className="contact-item">
                <div className="contact-type">Hours</div>
                <div className="contact-value">Mon–Fri: 9AM–6PM</div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="footer-bottom">
          <div className="bottom-container">
            <div className="copyright">
              © 2025 Digital Library Hub. All rights reserved.
            </div>
            <div className="extra-info">
              <span className="extra-item">Privacy Policy</span>
              <span className="extra-item">Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default UserFooter;
