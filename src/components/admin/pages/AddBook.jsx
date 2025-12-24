import React, { useState } from "react";
import "./AddBook.css";

function AddBook({ handleChange, handleSubmit, book }) {
  const [errors, setErrors] = useState({});

  const categories = [
    "Novel",
    "Science",
    "History",
    "Biography",
    "Technology",
    "Art",
    "Music",
    "Sports",
  ];

  const isEdit = !!book.id;

  const validate = () => {
    const newErrors = {};

    if (!book.name?.trim()) newErrors.name = "Book name is required";
    if (!book.category) newErrors.category = "Category is required";
    if (!book.author?.trim()) newErrors.author = "Author name is required";

    if (!book.count) {
      newErrors.count = "Stock is required";
    } else if (book.count < 1 || book.count > 10) {
      newErrors.count = "Stock must be between 1 and 10";
    }

    if (!book.image?.trim()) {
      newErrors.image = "Image URL is required";
    } else if (!/^https?:\/\/.+/i.test(book.image)) {
      newErrors.image = "Enter a valid image URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    handleSubmit(e);
  };

  const onChange = (e) => {
    handleChange(e);
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  return (
    <>
      <div className="addbook-page mt-5">
        <div className="addbook-container">
          {/* Header Section */}
          <div className="addbook-header">
            <div className="header-content">
              <h1 className="page-title">
                {isEdit ? "Edit Book" : "Add New Book"}
              </h1>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="addbook-card">
            <div className="card-header">
              <div className="card-title">
                {isEdit ? "Edit Book Details" : "Book Information"}
              </div>
            </div>

            <form onSubmit={onSubmit} noValidate className="addbook-form">
              {/* Book Name Field */}
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Book Name :</label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    name="name"
                    value={book.name || ""}
                    onChange={onChange}
                    className={`form-input ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter book title..."
                    autoComplete="off"
                  />
                  {errors.name && (
                    <div className="error-message">{errors.name}</div>
                  )}
                </div>
              </div>

              {/* Category Field */}
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Book Category :</label>
                </div>
                <div className="select-container">
                  <select
                    name="category"
                    value={book.category || ""}
                    onChange={onChange}
                    className={`form-select ${
                      errors.category ? "is-invalid" : ""
                    }`}
                  >
                    <option value="" disabled>
                      Select a category...
                    </option>
                    {categories.map((cat, index) => (
                      <option key={index} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <span className="select-arrow">▼</span>
                </div>
                {errors.category && (
                  <div className="error-message">{errors.category}</div>
                )}
              </div>

              {/* Author Field */}
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Book Author :</label>
                </div>
                <div className="input-container">
                  <input
                    type="text"
                    name="author"
                    value={book.author || ""}
                    onChange={onChange}
                    className={`form-input ${
                      errors.author ? "is-invalid" : ""
                    }`}
                    placeholder="Enter author name..."
                    autoComplete="off"
                  />
                  {errors.author && (
                    <div className="error-message">{errors.author}</div>
                  )}
                </div>
              </div>

              {/* Stock Field */}
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Book Stock :</label>
                </div>
                <div className="input-container">
                  <input
                    type="number"
                    name="count"
                    min={1}
                    max={10}
                    value={book.count || ""}
                    onChange={onChange}
                    className={`form-input ${errors.count ? "is-invalid" : ""}`}
                    placeholder="Enter stock quantity (1-10)..."
                  />
                </div>
                {errors.count && (
                  <div className="error-message">{errors.count}</div>
                )}
              </div>

              {/* Image URL Field */}
              <div className="form-group">
                <div className="form-label-row">
                  <label className="form-label">Book Cover Image URL :</label>
                </div>
                <div className="input-container">
                  <input
                    type="url"
                    name="image"
                    value={book.image || ""}
                    onChange={onChange}
                    className={`form-input ${errors.image ? "is-invalid" : ""}`}
                    placeholder="https://example.com/book-cover.jpg"
                    autoComplete="off"
                  />
                  {errors.image && (
                    <div className="error-message">{errors.image}</div>
                  )}
                </div>
                {book.image && !errors.image && (
                  <div className="image-preview">
                    <div className="preview-label">Preview:</div>
                    <img
                      src={book.image}
                      alt="Book cover preview"
                      className="preview-image"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/150x200/3b82f6/ffffff?text=📚";
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  <span className="btn-text">
                    {isEdit ? "Update Book" : "Add Book to Library"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
  
export default AddBook;
