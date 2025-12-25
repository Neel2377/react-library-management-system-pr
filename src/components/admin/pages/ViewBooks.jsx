import React, { useState } from "react";
import "./ViewBooks.css";

function ViewBooks({ list, handleDelete, handleEdit }) {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((list?.length || 0) / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = list.slice(startIndex, startIndex + itemsPerPage);

  return (
    <>
      <div className="viewbooks-wrapper">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 mt-5">
              <div className="table-responsive custom-table-card">
                <h2 className="text-center mb-4">View Books</h2>

                <table className="table table-bordered table-striped text-center">
                  <thead>
                    <tr>
                      <th>Sr.No</th>
                      <th>Book Image</th>
                      <th>Book Name</th>
                      <th>Book Category</th>
                      <th>Book Author</th>
                      <th>Book Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentItems.length > 0 ? (
                      currentItems.map((val, index) => {
                        const { image, name, category, author, count, id } =
                          val;

                        return (
                          <tr key={id}>
                            <td>{startIndex + index + 1}</td>
                            <td>
                              <img
                                src={image}
                                alt={name}
                                className="book-img"
                              />
                            </td>
                            <td>{name}</td>
                            <td>{category}</td>
                            <td>{author}</td>
                            <td>{count}</td>
                            <td>
                              <button
                                type="button"
                                onClick={() => handleDelete(id)}
                                className="btn btn-danger btn-sm w-50 py-1 px-sm-5 mx-auto"
                              >
                                Delete
                              </button>
                              <button
                                type="button"
                                onClick={() => handleEdit(id)}
                                className="btn btn-warning btn-sm w-50 mx-auto py-1 px-sm-5 my-1"
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center">
                          Data Not Found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>

                {}
                {totalPages > 1 && (
                  <nav className="d-flex justify-content-center mt-4">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((p) => Math.max(p - 1, 1))
                          }
                        >
                          Previous
                        </button>
                      </li>

                      {Array.from({ length: totalPages }).map((_, i) => (
                        <li
                          key={i}
                          className={`page-item ${
                            currentPage === i + 1 ? "active" : ""
                          }`}
                        >
                          <button
                            className="page-link"
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </button>
                        </li>
                      ))}

                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            setCurrentPage((p) => Math.min(p + 1, totalPages))
                          }
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewBooks;
