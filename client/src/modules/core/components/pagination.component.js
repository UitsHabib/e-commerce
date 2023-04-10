import _ from "lodash";

const Pagination = ({ data, limit, currentPage, setCurrentPage }) => {
  const totalPages = Math.ceil(data.length / limit);
  const pages = _.range(1, totalPages + 1);


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
         <span className="page-link"> {`<`} </span>
        </li>

        {
        
          <span className='mx-4'> {(currentPage * limit) - (limit - 1)} to {currentPage * limit} out of  {data.length}</span>
        
        }

        <li
          onClick={() => handlePageChange(currentPage + 1)}
          className={
            currentPage === totalPages ? "page-item disabled" : "page-item"
          }
          style={{ cursor: "pointer" }}
        >
          <span className="page-link"> {`>`} </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
