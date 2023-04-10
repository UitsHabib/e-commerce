import React, { useEffect, useState } from "react";
import axios from "axios";
import _ from "lodash";

import Table from "../common/Table/Table.component";
import Pagination from "../common/Table/Pagination.component";
import Button from "../common/button.component";
import { Link } from "react-router-dom";

const AdminList = () => {
    const [getAdmins, setGetAdmins] = useState([]);
    const [sortColumn, setSortColumn] = useState("Id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);

    const columns = [
        { name: "Id", path: "id" },
        { name: "First Name", path: "firstName" },
        { name: "Last Name", path: "lastName" },
        { name: "Email", path: "email" },
        { name: "Action" },
    ];

    const onHandleSort = (column, order) => {
        setSortColumn(column);
        setSortOrder(order);
    };
    const sortAdmins = () => {
        const column = columns.find((column) => column.name === sortColumn);
        const sortedAdmins = _.orderBy(getAdmins, column.path, sortOrder);
        return sortedAdmins;
    };
    const paginateAdmins = () => {
        const sortedAdmins = sortAdmins();
        const offset = (currentPage - 1) * limit;
        const paginatedAdmins = _.drop(sortedAdmins, offset).slice(0, limit);
        return paginatedAdmins;
    };

    const getAllAdmins = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/admins");
            setGetAdmins(data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllAdmins();
    }, []);
    return (
        <div className="container mt-3">
            <h3 className="text-center fs-2 fw-bold p-4">Admin List</h3>
            <Link to="/create">
                <Button type="submit" text="Add" className="btn btn-success my-2" />
            </Link>
            <div className="card body">
                <Table
                    columns={columns}
                    items={paginateAdmins()}
                    sortColumn={sortColumn}
                    sortOrder={sortOrder}
                    onHandleSort={onHandleSort}
                />

                <Pagination
                    items={getAdmins}
                    limit={limit}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default AdminList;
