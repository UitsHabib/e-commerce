function TableHeader({ columns, sortColumn, sortOrder, onHandleSort }) {
    return (
        <thead>
            <tr>
                {columns.map((column, index) => {
                    return (
                        <th
                            key={index}
                            scope="col"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                /*
                                    1. new column click => down arrow
                                    2. same column click => toggle arrow
                                     
                                 */
                                // sortColumn
                                onHandleSort(
                                    column.name,
                                    sortColumn === column.name
                                        ? sortOrder === "asc"
                                            ? "desc"
                                            : "asc"
                                        : "desc"
                                );
                            }}
                        >
                            {column.name}
                            {column.path &&
                                sortColumn === column.name &&
                                sortOrder === "asc" && (
                                    <i class="bi bi-arrow-down"></i>
                                )}
                            {column.path &&
                                sortColumn === column.name &&
                                sortOrder === "desc" && (
                                    <i class="bi bi-arrow-up"></i>
                                )}
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}

export default TableHeader;
