import React, { useEffect, useMemo, useState } from "react";

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
        bg: "success",
        icon: "🏷️",
      },
      {
        label: "Borrowed",
        value: borrowed,
        bg: "danger",
        icon: "📖",
      },
      {
        label: "Available",
        value: available,
        bg: "warning",
        icon: "✅",
      },
      {
        label: "Total Stock",
        value: totalStock,
        bg: "info",
        icon: "📦",
      },
      {
        label: "Users",
        value: totalUsers,
        bg: "dark",
        icon: "👥",
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
            <div className="stat-card" key={s.label}>
              <div className={`stat-header stat-${s.bg}`}>
                <div className="stat-icon">{s.icon}</div>
              </div>
              <div className="stat-body">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
              <div className="stat-footer">
                <div className="stat-progress">
                  <div
                    className={`progress-bar bg-${s.bg}`}
                    style={{ width: "75%" }}
                  ></div>
                </div>
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

            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th className="table-index">#</th>
                    <th className="table-book">Book</th>
                    <th className="table-author">Author</th>
                    <th className="table-category">Category</th>
                    <th className="table-stock">Stock</th>
                    <th className="table-status">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedRecentBooks.length ? (
                    paginatedRecentBooks.map((b, i) => (
                      <tr key={b.id} className="data-row">
                        <td className="table-index">
                          <div className="index-badge">
                            {startBookIndex + i + 1}
                          </div>
                        </td>
                        <td className="table-book">
                          <div className="book-info">
                            <div className="book-title">{b.name}</div>
                            <div className="book-id">ID: {b.id}</div>
                          </div>
                        </td>
                        <td className="table-author">
                          <div className="author-info">
                            <span className="author-icon">✍️</span>
                            {b.author}
                          </div>
                        </td>
                        <td className="table-category">
                          <span className="category-badge">{b.category}</span>
                        </td>
                        <td className="table-stock">
                          <div className="stock-count">{b.count}</div>
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

      <style>{`
        /* =====================
           GLOBAL STYLES
        ===================== */
        :root {
          --admin-primary: #0ea5e9;
          --admin-primary-light: #38bdf8;
          --admin-success: #10b981;
          --admin-danger: #ef4444;
          --admin-warning: #f59e0b;
          --admin-info: #06b6d4;
          --admin-dark: #1e293b;
          --admin-bg: #f8fafc;
          --admin-card-bg: #ffffff;
          --admin-text: #0f172a;
          --admin-text-light: #64748b;
          --admin-border: #e2e8f0;
          --admin-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          --admin-shadow-hover: 0 20px 40px rgba(0, 0, 0, 0.12);
          --radius: 16px;
          --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        /* =====================
           DASHBOARD CONTAINER
        ===================== */
        /* DASHBOARD LAYOUT FIX */
.admin-dashboard {
  background: var(--admin-bg);
  min-height: 100vh;
  padding: 2rem;
  animation: fadeIn 0.6s ease;
}

/* DESKTOP ONLY */
@media (min-width: 1200px) {
  .admin-dashboard {
    margin-left: 250px;
  }
}

/* MOBILE + TABLET */
@media (max-width: 1199px) {
  .admin-dashboard {
    margin-left: 0 !important;
    padding: 1rem;
  }
}


/* For centering the content */
.content-wrapper {
  max-width: 1400px; /* Or whatever max width you prefer */
  margin: 0 auto; /* This centers the content */
}

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =====================
           DASHBOARD HEADER
        ===================== */
        .dashboard-header {
          margin-bottom: 2rem;
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .dashboard-title {
          font-size: 2rem;
          font-weight: 800;
          color: var(--admin-text);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .title-icon {
          font-size: 2rem;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .date-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--admin-text-light);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .date-icon {
          font-size: 1rem;
        }

        .refresh-btn {
          background: linear-gradient(135deg, var(--admin-primary), var(--admin-primary-light));
          color: white;
          border: none;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .action-icon {
  background: none;
  border: none;
  cursor: pointer;
  color: #dc3545;
  font-size: 16px;
}

        .refresh-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(14, 165, 233, 0.2);
        }

        .refresh-icon {
          font-size: 0.9rem;
        }

        .welcome-message {
          color: var(--admin-text-light);
          font-size: 1rem;
          line-height: 1.6;
          max-width: 600px;
        }

        /* =====================
           STATS GRID
        ===================== */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .stat-card {
          background: var(--admin-card-bg);
          border-radius: var(--radius);
          box-shadow: var(--admin-shadow);
          overflow: hidden;
          transition: var(--transition);
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--admin-shadow-hover);
        }

        .stat-header {
          padding: 1.5rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .stat-primary { background: linear-gradient(135deg, var(--admin-primary), #3b82f6); }
        .stat-success { background: linear-gradient(135deg, var(--admin-success), #22c55e); }
        .stat-danger { background: linear-gradient(135deg, var(--admin-danger), #dc2626); }
        .stat-warning { background: linear-gradient(135deg, var(--admin-warning), #eab308); }
        .stat-info { background: linear-gradient(135deg, var(--admin-info), #0ea5e9); }
        .stat-dark { background: linear-gradient(135deg, var(--admin-dark), #334155); }

        .stat-icon {
          font-size: 2rem;
          color: white;
        }

        .stat-trend {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.3rem 0.7rem;
          border-radius: 20px;
          color: white;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .trend-icon {
          font-size: 0.9rem;
        }

        .stat-body {
          padding: 1.5rem;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: var(--admin-text);
          margin-bottom: 0.5rem;
          line-height: 1;
        }

        .stat-label {
          color: var(--admin-text-light);
          font-size: 0.9rem;
          font-weight: 500;
        }

        .stat-footer {
          padding: 0 1.5rem 1.5rem;
        }

        .stat-progress {
          height: 6px;
          background: var(--admin-border);
          border-radius: 3px;
          overflow: hidden;
        }

        .progress-bar {
          height: 100%;
          border-radius: 3px;
          transition: width 0.6s ease;
        }

        /* =====================
           CONTENT GRID
        ===================== */
        .content-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        @media (max-width: 1200px) {
          .content-grid {
            grid-template-columns: 1fr;
          }
        }

        .content-card {
          background: var(--admin-card-bg);
          border-radius: var(--radius);
          box-shadow: var(--admin-shadow);
          overflow: hidden;
        }

        .card-header {
          padding: 1.5rem;
          border-bottom: 1px solid var(--admin-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .header-left {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .card-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--admin-text);
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .card-badge {
          background: var(--admin-border);
          color: var(--admin-text-light);
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .header-right {
          display: flex;
          gap: 0.75rem;
        }

        .view-all-btn,
        .add-user-btn {
          background: none;
          border: 1px solid var(--admin-border);
          color: var(--admin-text);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .view-all-btn:hover,
        .add-user-btn:hover {
          background: var(--admin-primary);
          color: white;
          border-color: var(--admin-primary);
        }

        .btn-icon {
          font-size: 0.9rem;
        }

        /* =====================
           TABLES
        ===================== */
        .table-container {
          overflow-x: auto;
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table thead {
          background: #f8fafc;
        }

        .data-table th {
          padding: 1rem 1.5rem;
          text-align: left;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--admin-text-light);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          white-space: nowrap;
        }

        .data-table td {
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--admin-border);
        }

        .data-row:hover {
          background: #f8fafc;
        }

        /* Table Cells Styling */
        .index-badge {
          width: 28px;
          height: 28px;
          background: var(--admin-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--admin-text-light);
        }

        .book-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .book-title {
          font-weight: 600;
          color: var(--admin-text);
        }

        .book-id {
          font-size: 0.75rem;
          color: var(--admin-text-light);
        }

        .author-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .author-icon {
          font-size: 0.9rem;
          opacity: 0.7;
        }

        .category-badge {
          background: #e0f2fe;
          color: #0369a1;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        .stock-count {
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--admin-text);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.8rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .status-available {
          background: #dcfce7;
          color: #166534;
        }

        .status-borrowed {
          background: #fee2e2;
          color: #991b1b;
        }

        .status-icon {
          font-size: 0.8rem;
        }

        /* User Table Styles */
        .user-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .user-avatar {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, var(--admin-primary), var(--admin-primary-light));
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .user-name {
          font-weight: 600;
          color: var(--admin-text);
        }

        .user-joined {
          font-size: 0.75rem;
          color: var(--admin-text-light);
        }

        .email-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .email-icon {
          font-size: 0.9rem;
          opacity: 0.7;
        }

        .role-badge {
          display: inline-block;
          padding: 0.3rem 0.75rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .role-admin {
          background: #fef3c7;
          color: #92400e;
        }

        .role-user {
          background: #e0f2fe;
          color: #0369a1;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .action-btn {
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: var(--transition);
        }

        .edit-btn {
          background: #e0f2fe;
          color: #0369a1;
        }

        .edit-btn:hover {
          background: #bae6fd;
        }

        .delete-btn {
          background: #fee2e2;
          color: #dc2626;
        }

        .delete-btn:hover {
          background: #fecaca;
        }

        .action-icon {
          font-size: 0.9rem;
        }

        /* Empty States */
        .empty-row td {
          padding: 3rem 1.5rem;
        }

        .empty-state {
          text-align: center;
        }

        .empty-icon {
          font-size: 2.5rem;
          opacity: 0.3;
          margin-bottom: 1rem;
        }

        .empty-text {
          color: var(--admin-text-light);
          font-size: 0.95rem;
        }

        /* =====================
           PAGINATION
        ===================== */
        .table-pagination {
          padding: 1.5rem;
          border-top: 1px solid var(--admin-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .pagination-info {
          color: var(--admin-text-light);
          font-size: 0.9rem;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pagination-btn {
          background: none;
          border: 1px solid var(--admin-border);
          color: var(--admin-text);
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: var(--transition);
        }

        .pagination-btn:hover:not(.disabled) {
          background: var(--admin-primary);
          color: white;
          border-color: var(--admin-primary);
        }

        .pagination-btn.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .page-numbers {
          display: flex;
          gap: 0.25rem;
        }

        .page-number {
          width: 36px;
          height: 36px;
          background: none;
          border: 1px solid var(--admin-border);
          border-radius: 8px;
          color: var(--admin-text);
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
        }

        .page-number:hover {
          background: #f1f5f9;
        }

        .page-number.active {
          background: var(--admin-primary);
          color: white;
          border-color: var(--admin-primary);
        }

        /* =====================
           QUICK STATS
        ===================== */
        .quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .quick-stats .stat-item {
          background: var(--admin-card-bg);
          border-radius: var(--radius);
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1rem;
          box-shadow: var(--admin-shadow);
        }

        .quick-stats .stat-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, var(--admin-primary), var(--admin-primary-light));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: white;
        }

        .quick-stats .stat-content {
          flex: 1;
        }

        .quick-stats .stat-value {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--admin-text);
          margin-bottom: 0.25rem;
        }

        .quick-stats .stat-label {
          color: var(--admin-text-light);
          font-size: 0.85rem;
        }

        /* =====================
           RESPONSIVE DESIGN
        ===================== */
        @media (max-width: 1200px) {
          .admin-dashboard {
            padding: 1.5rem;
          }
        }

        @media (max-width: 768px) {
          .admin-dashboard {
            padding: 1rem;
          }
          
          .dashboard-title {
            font-size: 1.5rem;
          }
          
          .header-content {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .header-actions {
            width: 100%;
            justify-content: space-between;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .table-pagination {
            flex-direction: column;
            gap: 1rem;
            text-align: center;
          }
        }

        @media (max-width: 576px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
          
          .data-table th,
          .data-table td {
            padding: 0.75rem 1rem;
          }
          
          .card-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          
          .header-right {
            width: 100%;
            justify-content: flex-start;
          }
          
          .pagination-controls {
            flex-direction: column;
            gap: 0.75rem;
          }
        }

        /* =====================
           REDUCED MOTION
        ===================== */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </>
  );
}

export default Dashboard;
