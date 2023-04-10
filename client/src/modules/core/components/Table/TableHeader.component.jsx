import React from "react";

const TableHeader = ({ columns, sortColumn, sortOrder, onHandleSort }) => {
    return (
        <>
            <thead>
                <tr>
                    {columns.map((column, index) => {
                        return (
                            <React.Fragment>
                                <th
                                    key={index}
                                    scope="col"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => {
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

                                    {sortColumn === column.name && sortOrder === "asc" && (
                                        <i className="bi bi-arrow-down"></i>
                                    )}
                                    {sortColumn === column.name && sortOrder === "desc" && (
                                        <i className="bi bi-arrow-up"></i>
                                    )}
                                </th>
                            </React.Fragment>
                        );
                    })}
                </tr>
            </thead>
        </>
    );
};

export default TableHeader;
