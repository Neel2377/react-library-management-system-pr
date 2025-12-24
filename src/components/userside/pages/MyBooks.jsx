/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserFooter from "../UserFooter";
import UserHeader from "../UserHeader";
import "./MyBooks.css";

function MyBooks({ handleUserLogout }) {
  const navigate = useNavigate();
  const [groupedBooks, setGroupedBooks] = useState([]);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuth") === "true";
    const user = JSON.parse(localStorage.getItem("currentUser"));

    if (!isAuth || !user) {
      navigate("/login", { replace: true });
      return;
    }

    const books = Array.isArray(user.myBooks) ? user.myBooks : [];

    const grouped = Object.values(
      books.reduce((acc, book) => {
        if (!acc[book.id]) {
          acc[book.id] = { ...book, qty: 1 };
        } else {
          acc[book.id].qty += 1;
        }
        return acc;
      }, {})
    );

    setGroupedBooks(grouped);
  }, []);

  const updateUserBooks = (updatedMyBooks) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const updatedUser = { ...user, myBooks: updatedMyBooks };

    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    localStorage.setItem(
      "users",
      JSON.stringify(
        users.map((u) => (u.email === user.email ? updatedUser : u))
      )
    );
  };

  const restoreBookCount = (bookId) => {
    const books = JSON.parse(localStorage.getItem("Books")) || [];
    const updated = books.map((b) =>
      b.id === bookId ? { ...b, count: b.count + 1 } : b
    );
    localStorage.setItem("Books", JSON.stringify(updated));
  };

  const handleRemoveOne = (bookId) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const myBooks = user.myBooks || [];

    const index = myBooks.findIndex((b) => b.id === bookId);
    if (index === -1) return;

    myBooks.splice(index, 1);
    restoreBookCount(bookId);
    updateUserBooks(myBooks);

    const regrouped = Object.values(
      myBooks.reduce((acc, book) => {
        if (!acc[book.id]) {
          acc[book.id] = { ...book, qty: 1 };
        } else {
          acc[book.id].qty += 1;
        }
        return acc;
      }, {})
    );

    setGroupedBooks(regrouped);
  };

  const handleRemoveAll = () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const myBooks = user.myBooks || [];

    myBooks.forEach((b) => restoreBookCount(b.id));
    updateUserBooks([]);
    setGroupedBooks([]);
  };

  return (
    <>
      <UserHeader onLogout={handleUserLogout} />

      <div className="mybooks-container">
        <div className="mybooks-header">
          <div className="header-content">
            <div className="title-section">
              <h1 className="page-title mx-5 text-white">My Library</h1>
              <p className="page-subtitle text-white">
                Manage your borrowed books collection
              </p>
            </div>

            <div className="header-stats">
              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-number text-white">
                    {groupedBooks.length}
                  </div>
                  <div className="stat-label text-white">Unique Books</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-content">
                  <div className="stat-number text-white">
                    {groupedBooks.reduce((sum, book) => sum + book.qty, 0)}
                  </div>
                  <div className="stat-label text-white">Total Copies</div>
                </div>
              </div>
            </div>
          </div>

          {groupedBooks.length > 0 && (
            <div className="header-actions w-25 mx-auto">
              <button className="btn btn-remove-all" onClick={handleRemoveAll}>
                Clear All Books
              </button>
            </div>
          )}
        </div>

        <div className="mybooks-content">
          {groupedBooks.length > 0 ? (
            <>
              <div className="books-grid">
                {groupedBooks.map((book) => (
                  <div className="book-card" key={book.id}>
                    <div className="book-card-inner">
                      <div className="book-image-container">
                        <div className="book-quantity-badge">
                          <span className="quantity-text">x{book.qty}</span>
                        </div>
                        <img
                          src={book.image}
                          className="book-image"
                          alt={book.name}
                        />
                        <div className="book-overlay">
                          <div className="overlay-content">
                            <button
                              className="btn-return-book"
                              onClick={() => handleRemoveOne(book.id)}
                            >
                              Return Copy
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="book-info">
                        <h3 className="book-title">{book.name}</h3>

                        <div className="book-meta">
                          <div className="meta-item">
                            <span className="meta-icon">✍️</span>
                            <span className="meta-label">Author:</span>
                            <span className="meta-value">{book.author}</span>
                          </div>
                          <div className="meta-item">
                            <span className="meta-icon">🏷️</span>
                            <span className="meta-label">Category:</span>
                            <span className="meta-value">{book.category}</span>
                          </div>
                        </div>

                        <div className="book-actions">
                          <button
                            className="btn btn-remove-one"
                            onClick={() => handleRemoveOne(book.id)}
                          >
                            Return Copy
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="empty-library">
              <div className="empty-content">
                <h3 className="empty-title">Your Library is Empty</h3>
                <p className="empty-description">
                  You haven't borrowed any books yet. Start exploring our
                  collection to add books to your library.
                </p>
                <button
                  className="btn btn-explore-books mx-auto"
                  onClick={() => navigate("/")}
                >
                  Explore Books
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <UserFooter />
    </>
  );
}

export default MyBooks;
