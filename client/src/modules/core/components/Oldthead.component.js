const Thead = ({ columns, sortColumn, sortOrder, onHandleSort }) => {
    return (
        <thead>
            <tr>
                {
                    columns.map(column => {
                        return <th 
                                    key={column.name}
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
                            {sortColumn === column.name && sortOrder === "asc" &&   (
                                <i className="bi bi-arrow-down"></i>
                            )}
                            {sortColumn === column.name && sortOrder === "desc" &&   (
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