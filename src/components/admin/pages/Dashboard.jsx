import React, { useEffect, useMemo, useState } from "react";
import "./Dashboard.css";

function Dashboard({ books = [], users = [], setUsers }) {
  useEffect(() => {
    const syncUsers = () => {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
      setUsers(storedUsers);
    };

    const syncBooks = () => {
      const storedBooks = JSON.parse(localStorage.getItem("books")) || [];

      window.dispatchEvent(
        new CustomEvent("booksUpdated", { detail: storedBooks })
      );
    };

    syncUsers();
    syncBooks();

    window.addEventListener("profileUpdated", syncUsers);
    window.addEventListener("booksUpdated", syncBooks);

    window.addEventListener("storage", (e) => {
      if (e.key === "users") syncUsers();
      if (e.key === "books") syncBooks();
    });

    return () => {
      window.removeEventListener("profileUpdated", syncUsers);
      window.removeEventListener("booksUpdated", syncBooks);
      window.removeEventListener("storage", syncUsers);
    };
  }, [setUsers]);

  const stats = useMemo(() => {
    const totalBooks = books.length;
    const categories = new Set(books.map((b) => b.category)).size;
    const borrowed = books.filter((b) => Number(b.count) === 0).length;
    const available = books.filter((b) => Number(b.count) > 0).length;
    const totalStock = books.reduce((sum, b) => sum + Number(b.count || 0), 0);
    const totalUsers = users.length;

    return [
      {
        label: "Total Books",
        value: totalBooks,
        bg: "primary",
        icon: "📚",
      },
      {
        label: "Categories",
        value: categories,
        bg: "info",
        icon: "📂",
      },
      {
        label: "Borrowed",
        value: borrowed,
        bg: "danger",
        icon: "📕",
      },
      {
        label: "Available",
        value: available,
        bg: "success",
        icon: "📗",
      },
      {
        label: "Total Stock",
        value: totalStock,
        bg: "warning",
        icon: "📦",
      },
      {
        label: "Users",
        value: totalUsers,
        bg: "dark",
        icon: "👤",
      },
    ];
  }, [books, users]);

  const recentBooks = books.slice(-10).reverse();
  const booksPerPage = 5;
  const [currentBookPage, setCurrentBookPage] = useState(1);

  const totalBookPages = Math.ceil(recentBooks.length / booksPerPage);
  const startBookIndex = (currentBookPage - 1) * booksPerPage;
  const paginatedRecentBooks = recentBooks.slice(
    startBookIndex,
    startBookIndex + booksPerPage
  );

  const recentUsers = users.slice(-10).reverse();

  const handleDeleteUser = (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const updatedUsers = users.filter((u) => u.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser?.id === id) {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("isAuth");
    }
  };

  return (
    <>
      <div className="admin-dashboard mt-5">
        {/* Dashboard Header */}
        <div className="dashboard-header">
          <div className="header-content">
            <h1 className="dashboard-title">Dashboard Overview</h1>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((s) => (
            <div className={`stat-card bg-${s.bg}`} key={s.label}>
              <div className="stat-header">
                <span className="stat-icon">{s.icon}</span>
              </div>

              <div className="stat-body">
                <div className="stat-value text-white fs-1">{s.value}</div>
                <div className="stat-label text-white fs-4">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="content mb-5">
          {/* Recent Books Table */}
          <div className="content-card books-card">
            <div className="card-header">
              <div className="header-left">
                <h3 className="card-title">Recent Books</h3>
                <div className="card-badge">{books.length} total</div>
              </div>
            </div>

            <div className="table-container text-center">
              <table className="data-table table table-bordered table-striped table-hover">
                <thead>
                  <tr>
                    <th className="table-index text-center">#</th>
                    <th className="table-book text-center">Book</th>
                    <th className="table-author text-center">Author</th>
                    <th className="table-stock text-center">Stock</th>
                    <th className="table-status text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecentBooks.length ? (
                    paginatedRecentBooks.map((b, i) => (
                      <tr key={b.id} className="data-row">
                        <td className="table-index index-center">
                          <div className="index-badge">
                            {startBookIndex + i + 1}
                          </div>
                        </td>
                        <td className="table-book">
                          <div className="book-info">
                            <div className="book-title text-center">{b.name}</div>
                            <div className="book-id">ID: {b.id}</div>
                          </div>
                        </td>
                        <td className="table-author">
                          <div className="author-info author-center">
                            {b.author}
                          </div>
                        </td>
                       
                        <td className="table-stock">
                          <div className="stock-count text-center">{b.count}</div>
                        </td>
                        <td className="table-status">
                          <div
                            className={`status-badge ${
                              b.count === 0
                                ? "status-borrowed"
                                : "status-available"
                            }`}
                          >
                            {b.count === 0 ? (
                              <>
                                <span className="status-icon">📤</span>
                                Borrowed
                              </>
                            ) : (
                              <>
                                <span className="status-icon">✅</span>
                                Available
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="empty-row">
                      <td colSpan="6" className="empty-state">
                        <div className="empty-text">No books available</div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalBookPages > 1 && (
              <div className="table-pagination">
                <div className="pagination-info">
                  Showing {startBookIndex + 1} to{" "}
                  {Math.min(startBookIndex + booksPerPage, recentBooks.length)}{" "}
                  of {recentBooks.length} entries
                </div>
                <div className="pagination-controls">
                  <button
                    className={`pagination-btn prev-btn ${
                      currentBookPage === 1 ? "disabled" : ""
                    }`}
                    onClick={() => setCurrentBookPage(currentBookPage - 1)}
                    disabled={currentBookPage === 1}
                  >
                    <span className="btn-icon">←</span> Previous
                  </button>

                  <div className="page-numbers">
                    {Array.from({ length: totalBookPages }).map((_, index) => (
                      <button
                        key={index}
                        className={`page-number ${
                          currentBookPage === index + 1 ? "active" : ""
                        }`}
                        onClick={() => setCurrentBookPage(index + 1)}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    className={`pagination-btn next-btn ${
                      currentBookPage === totalBookPages ? "disabled" : ""
                    }`}
                    onClick={() => setCurrentBookPage(currentBookPage + 1)}
                    disabled={currentBookPage === totalBookPages}
                  >
                    Next <span className="btn-icon">→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="content-card users-card">
          <div className="card-header">
            <div className="header-left">
              <h3 className="card-title">Recent Users</h3>
              <div className="card-badge">{users.length} total</div>
            </div>
            <div className="header-right"></div>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="table-index">#</th>
                  <th className="table-user">User</th>
                  <th className="table-email">Email</th>
                  <th className="table-role">Role</th>
                  <th className="table-action">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.length ? (
                  recentUsers.map((u, i) => (
                    <tr key={u.id} className="data-row">
                      <td className="table-index">
                        <div className="index-badge">{i + 1}</div>
                      </td>
                      <td className="table-user">
                        <div className="user-info">
                          <div className="user-avatar">
                            {u.username?.charAt(0) || "U"}
                          </div>
                          <div className="user-details">
                            <div className="user-name">{u.username}</div>
                            <div className="user-joined">Joined recently</div>
                          </div>
                        </div>
                      </td>
                      <td className="table-email">
                        <div className="email-info">{u.email}</div>
                      </td>
                      <td className="table-role">
                        <div
                          className={`role-badge ${
                            u.role === "Admin" ? "role-admin" : "role-user"
                          }`}
                        >
                          {u.role || "User"}
                        </div>
                      </td>
                      <td className="table-action">
                        <div className="action-buttons">
                          <button
                            className="action-btn delete-btn"
                            onClick={() => handleDeleteUser(u.id)}
                          >
                            <button className="action-icon" aria-label="Delete">
                              <i className="fas fa-trash"></i>
                            </button>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="empty-row">
                    <td colSpan="5" className="empty-state">
                      <div className="empty-text">No users found</div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-item">
            <div className="stat-content mx-5">
              <div className="stat-value">
                {books.filter((b) => Number(b.count) === 0).length}
              </div>
              <div className="stat-label">Books Borrowed Today</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-content mx-5">
              <div className="stat-value">
                {users.filter((u) => u.myBooks?.length > 0).length}
              </div>
              <div className="stat-label">Active Readers</div>
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-content mx-5">
              <div className="stat-value">
                {Math.round(
                  (books.filter((b) => Number(b.count) > 0).length /
                    books.length) *
                    100
                ) || 0}
                %
              </div>
              <div className="stat-label">Availability Rate</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
