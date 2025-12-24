/* eslint-disable react-hooks/set-state-in-effect */
import React, { useEffect, useState } from "react";
import "./Home.css";

function Home() {
  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [visibleLatestCount, setVisibleLatestCount] = useState(4);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("Books")) || [];
    setBooks(storedBooks);
  }, []);

  const latestBooks = books.slice().reverse().slice(0, visibleLatestCount);

  const handleBorrow = (id) => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (!user) {
      alert("Please login first");
      return;
    }

    const bookToBorrow = books.find((b) => b.id === id);
    if (!bookToBorrow || bookToBorrow.count === 0) return;

    const updatedBooks = books.map((book) =>
      book.id === id ? { ...book, count: book.count - 1 } : book
    );

    const updatedUser = {
      ...user,
      myBooks: [...(user.myBooks || []), bookToBorrow],
    };

    setBooks(updatedBooks);
    localStorage.setItem("Books", JSON.stringify(updatedBooks));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
  };

  const categories = [
    "All Categories",
    ...new Set(books.map((book) => book.category)),
  ];

  const filteredBooks =
    selectedCategory === "All Categories"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <>
      {/* Enhanced Carousel */}
      <div className="carousel-wrapper">
        <div
          id="carouselExampleIndicators"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={0}
              className="active"
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={1}
            />
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to={2}
            />
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="carousel-image-container">
                <img
                  src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
                  className="d-block w-100 carousel-image"
                  alt="Books"
                />
                <div className="carousel-overlay">
                  <h1 className="carousel-title">
                    Welcome to Our Digital Library
                  </h1>
                  <p className="carousel-subtitle">
                    Discover thousands of books at your fingertips
                  </p>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="carousel-image-container">
                <img
                  src="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                  className="d-block w-100 carousel-image"
                  alt="Books"
                />
                <div className="carousel-overlay">
                  <h1 className="carousel-title">Read Anywhere, Anytime</h1>
                  <p className="carousel-subtitle">
                    Access your favorite books on any device
                  </p>
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div className="carousel-image-container">
                <img
                  src="https://images.unsplash.com/photo-1507842217343-583bb7270b66"
                  className="d-block w-100 carousel-image"
                  alt="Books"
                />
                <div className="carousel-overlay">
                  <h1 className="carousel-title">Expand Your Knowledge</h1>
                  <p className="carousel-subtitle">
                    Explore diverse genres and authors
                  </p>
                </div>
              </div>
            </div>
          </div>

          <button
            className="carousel-control-prev carousel-control-btn"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
          </button>

          <button
            className="carousel-control-next carousel-control-btn"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
          </button>
        </div>
      </div>

      {/* Latest Books Section */}
      <div className="container my-5">
        <div className="section-header">
          <h3 className="section-title">Latest Books</h3>
          <div className="section-badge">
            <span className="badge-count">{latestBooks.length}</span> new
            arrivals
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {latestBooks.length ? (
            latestBooks.map((book) => (
              <div className="col-md-3" key={book.id}>
                <div className="book-card h-100 position-relative">
                  <span className="book-badge">
                    <span className="badge-new">NEW</span>
                  </span>

                  <div className="book-image-wrapper">
                    <img
                      src={book.image}
                      className="card-img-top book-image"
                      alt={book.name}
                    />
                  </div>

                  <div className="card-body">
                    <h5 className="book-title">{book.name}</h5>
                    <div className="book-meta">
                      <p className="book-author">
                        <span className="meta-icon">✍️</span> {book.author}
                      </p>
                      <p className="book-category">
                        <span className="meta-icon">🏷️</span> {book.category}
                      </p>
                    </div>
                    <div className="book-stock">
                      <span
                        className={`stock-status ${
                          book.count === 0 ? "out-of-stock" : "in-stock"
                        }`}
                      >
                        <span className="status-icon">
                          {book.count === 0 ? "⛔" : "✅"}
                        </span>
                        {book.count === 0
                          ? "Out of Stock"
                          : `${book.count} Available`}
                      </span>
                    </div>
                  </div>

                  <div className="card-footer bg-transparent border-0 text-center">
                    <button
                      className="btn btn-borrow"
                      disabled={book.count === 0}
                      onClick={() => handleBorrow(book.id)}
                    >
                      <span className="btn-icon">📖</span>
                      {book.count === 0 ? "Out of Stock" : "Borrow Book"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon"></div>
              <p className="empty-text">No books available</p>
            </div>
          )}
        </div>

        {visibleLatestCount < books.length && (
          <div className="text-center mt-5">
            <button
              className="btn btn-load-more mx-auto border border-2 border-secondary"
              onClick={() => setVisibleLatestCount((prev) => prev + 4)}
            >
              Load More Books
            </button>
          </div>
        )}
      </div>

      {/* Categories Section */}
      <div className="container my-5">
        <div className="section-header">
          <div className="section-title-wrapper">
            <h3 className="section-title">Browse Categories</h3>
            <p className="section-subtitle">Browse Categories with All Books</p>
          </div>
          <div className="category-filter-wrapper">
            <div className="filter-label">Filter:</div>
            <select
              className="form-select category-select"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <div className="category-count gap-3">
              {filteredBooks.length}
              Books Found
            </div>
          </div>
        </div>

        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filteredBooks.length ? (
            filteredBooks.map((book) => (
              <div className="col-md-3" key={book.id}>
                <div className="book-card h-100">
                  <div className="book-image-wrapper">
                    <img
                      src={book.image}
                      className="card-img-top book-image"
                      alt={book.name}
                    />
                    <div className="category-badge">{book.category}</div>
                  </div>
                  <div className="card-body">
                    <h5 className="book-title">{book.name}</h5>
                    <div className="book-meta">
                      <p className="book-author">
                        <span className="meta-icon">✍️</span> {book.author}
                      </p>
                      <p className="book-category">
                        <span className="meta-icon">🏷️</span> {book.category}
                      </p>
                    </div>
                    <div className="book-stock">
                      <span
                        className={`stock-status ${
                          book.count === 0 ? "out-of-stock" : "in-stock"
                        }`}
                      >
                        <span className="status-icon">
                          {book.count === 0 ? "⛔" : "✅"}
                        </span>
                        {book.count === 0
                          ? "Out of Stock"
                          : `${book.count} Available`}
                      </span>
                    </div>
                  </div>
                  <div className="card-footer bg-transparent border-0 text-center">
                    <button
                      className="btn btn-borrow"
                      disabled={book.count === 0}
                      onClick={() => handleBorrow(book.id)}
                    >
                      <span className="btn-icon">📖</span>
                      {book.count === 0 ? "Out of Stock" : "Borrow Book"}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">
              <p className="empty-text">No books found for this category</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;
