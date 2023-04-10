import _ from "lodash";

const Pagination = ({ data, limit, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(data.length / limit);
  const pages = _.range(1, totalPages + 1);
  const nextMaxPage = currentPage + 3;
  const prevMaxPage = currentPage - 4;

  const handlePageChange = (page) => {
    if (page < 1) return;
    if (page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li
          className={currentPage === 1 ? "page-item disabled" : "page-item"}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{ cursor: "pointer" }}
        >
          <span className="page-link">Previous</span>
        </li>

        {pages.map((page, index) => {
          if (page < nextMaxPage && index > prevMaxPage) {
            return (
              <li
                key={`pagination-${index}`}
                className={
                  page === currentPage ? "page-item active" : "page-item"
                }
                onClick={() => handlePageChange(page)}
              >
                <span className="page-link">{page}</span>
              </li>
            );
          } else {
            return <li>.</li>;
          }
        })}

        <li
          onClick={() => handlePageChange(currentPage + 1)}
          className={
            currentPage === totalPages ? "page-item disabled" : "page-item"
          }
        >
          <span className="page-link">Next</span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
