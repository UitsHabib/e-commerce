import React from "react";
import TableHeader from "./TableHeader.component";
import TableBody from "./TableBody.component";

const Table = ({ columns, items, sortColumn, sortOrder, onHandleSort }) => {
    return (
        <>
            <table class="table table-bordered">
                <TableHeader
                    columns={columns}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onHandleSort={onHandleSort}
                />
                <TableBody items={items} columns={columns} />
            </table>
        </>
    );
};

export default Table;
