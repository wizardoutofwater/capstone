import React from "react";

const PaginationList = ({ totalPages, currentPage, handlePageChange }) => {
    const pagesArray = []
    for (let i = 1; i <= totalPages; i++) {
          pagesArray.push(i)
    }

  return (
    <nav className="pagination">
        <ul className="pagination-list">
            {pagesArray.map((page) => {
                return (
                    <li onClick={() => handlePageChange(page)} className={currentPage === page ? "pagination-link is-current" : "pagination-link"} aria-label={`Go to page ${page}`}>{page}</li>
                )
            })}
        </ul>
    </nav>
  );
};

export default PaginationList;