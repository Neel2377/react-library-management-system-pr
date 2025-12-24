import React from "react";
import UserHeader from "../UserHeader";
import UserFooter from "../UserFooter";
import "./AboutUs.css";

function AboutUs({ handleUserLogout }) {
  return (
    <>
      <UserHeader onLogout={handleUserLogout} />

      <div className="about-us container">
        <div className="about-page container mb-5">
          {}
          <div className="about-hero">
            <div className="hero-image-container">
              <img
                src="https://www.backdropsource.com/cdn/shop/products/25BookshelfBackground.jpg?v=1591710886&utm_source=chatgpt.com"
                alt="Library bookshelf"
                className="hero-image"
              />
              <div className="hero-overlay"></div>
              <div className="hero-content">
                <div className="hero-text-wrapper">
                  <h1 className="hero-title">About Our Digital Library</h1>
                  <p className="hero-subtitle">
                    Revolutionizing the way you discover and manage books
                  </p>
                </div>
              </div>
            </div>
          </div>

          {}
          <div className="about-content-wrapper">
            <div className="about-main-content">
              <div className="content-header">
                <h2 className="content-title">Our Mission & Vision</h2>
                <p className="content-intro">
                  Empowering readers with seamless access to knowledge through
                  innovative digital solutions
                </p>
              </div>

              <div className="about-grid">
                <div className="about-card">
                  <h3 className="card-title text-black">Our Mission</h3>
                  <p className="card-text">
                    To create an intuitive digital ecosystem that simplifies
                    library management while enhancing the reading experience
                    for every user. We aim to bridge the gap between traditional
                    libraries and modern technology.
                  </p>
                </div>

                <div className="about-card">
                  <h3 className="card-title text-black">Our Vision</h3>
                  <p className="card-text">
                    To become the leading digital library platform that
                    transforms how people access, manage, and share knowledge
                    globally. We envision a world where everyone has equal
                    access to information and literature.
                  </p>
                </div>

                <div className="about-card">
                  <h3 className="card-title text-black">Innovation</h3>
                  <p className="card-text">
                    Leveraging cutting-edge technology to create smart features
                    like personalized recommendations, real-time availability
                    tracking, and seamless borrowing processes that adapt to
                    modern reading habits.
                  </p>
                </div>
              </div>

              <div className="about-details">
                <div className="details-section">
                  <h3 className="details-title">About the Platform</h3>
                  <p className="details-text">
                    Our Library Management System is designed to simplify and
                    modernize the way libraries manage books, members, and daily
                    operations. The platform provides an efficient and
                    user-friendly interface that allows users to explore
                    available books, check categories, and borrow books with
                    ease. At the same time, administrators can manage book
                    inventory, track borrowed and available books, and organize
                    library data in a structured manner.
                  </p>
                </div>

                <div className="details-section">
                  <h3 className="details-title">Our Impact</h3>
                  <p className="details-text">
                    This system aims to reduce manual work, improve accuracy,
                    and save time by automating common library tasks. By
                    offering features such as category-based browsing, real-time
                    stock updates, and secure user access, the Library
                    Management System ensures a smooth experience for both users
                    and administrators. Our goal is to create a reliable digital
                    solution that makes library management more accessible,
                    organized, and efficient for everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UserFooter />
    </>
  );
}

export default AboutUs;
