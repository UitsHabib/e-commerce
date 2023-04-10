import React from "react";
import _ from "lodash";

const Pagination = ({ items, limit, currentPage, setCurrentPage }) => {
    const totalPages = Math.ceil(items.length / limit);
    const pages = _.range(1, totalPages + 1);

    function handlePageChange(page) {
        const total = items.length;
        const totalPages = Math.ceil(total / limit);
        if (page < 1) return;
        if (page > totalPages) return;
        setCurrentPage(page);
    }

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination justify-content-center" style={{ cursor: "pointer" }}>
                <li
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "page-item disabled" : "page-item"}
                >
                    <span className="page-link">Previous</span>
                </li>
                {pages.map((page, index) => {
                    return (
                        <li
                            key={index}
                            className={currentPage === page ? "page-item active" : "page-item"}
                            onClick={() => handlePageChange(page)}
                        >
                            <span className="page-link">{page}</span>
                        </li>
                    );
                })}

                <li
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "page-item disabled" : "page-item"}
                >
                    <span className="page-link">Next</span>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
