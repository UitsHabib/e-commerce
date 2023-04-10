const Thead = ({ columns, sortColumn, sortOrder, onHandleSort, sorting }) => {
    return (
        <thead>
            <tr>
                {
                    columns.map((column, index) => {
                        return <th 
                                    key={`thead-${index}`}
                                    onClick={()=>{
                                        onHandleSort( column.name,
                                            sortColumn === column.name
                                                ? sortOrder === "asc"
                                                    ? "desc"
                                                    : "asc"
                                                : "desc")
                                    }}
                                >
                            {column.name}
                            {sortColumn === column.name && sortOrder === "asc" && sorting &&  (
                                <i className="bi bi-arrow-down"></i>
                            )}
                            {sortColumn === column.name && sortOrder === "desc" && sorting &&  (
                                <i className="bi bi-arrow-up"></i>
                            )}
                        </th>
                    })
                }
            </tr>
        </thead>
    )
}

export default Thead