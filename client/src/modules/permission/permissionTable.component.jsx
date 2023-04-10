import { useNavigate } from "react-router-dom";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import Pagination from "../core/components/pagination.component";
import TableLimit from "../core/components/table/table-limit.component";
import Table from "../core/components/table/table.component";
import Header from "../core/components/header.component";
import { getPermission } from "./permission.action";
import { useSelector, useDispatch } from "react-redux";
import PermissionCreate from "./permission.create";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

function PermmissionTable() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const permissionList = useSelector(
        (state) => state.permissionReducer.permissionList
    );
    const permissions = permissionList?.todos || [];
    // const [permissions, setPermissions] = useState([]);
    const [sortColumn, setSortColumn] = useState("Id");
    const [sortOrder, setSortOrder] = useState("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleDropdownChange = (selected) => {
        setSelectedOption(selected);
    };

    const handleUpdate = () => {
        // handle edit action here
        navigate("/permission-create");
    };

    const handleDelete = () => {
        console.log("Call Delete AIP");
    };

    const dropdownOptions = [
        { value: "select", label: "Select Action" },
        { value: "edit", label: "Edit" },
        { value: "delete", label: "Delete" },
    ];

    const defaultOption = dropdownOptions[0];

    const columns = [
        { name: "Id", path: "id" },
        { name: "Name", path: "todo" },
        {
            name: "Description",
            getContent: (permission, id) => {
                return (
                    <td key={`col-${id}`}>
                        {permission.completed ? "Completed" : "Pending"}
                    </td>
                );
            },
        },
        {
            name: "Action",
            getContent: (permission, id) => {
                return (
                    <>
                        {/* <td key={`col-${id}`}>
                            {<i className="bi bi-gear"></i>}
                        </td> */}
                        <td>
                            <Dropdown
                                options={dropdownOptions}
                                onChange={handleDropdownChange}
                                value={defaultOption}
                                placeholder="Select an option"
                            />
                            {selectedOption &&
                                selectedOption.value === "edit" &&
                                handleUpdate(permission)}

                            {selectedOption &&
                                selectedOption.value === "delete" &&
                                handleDelete(permission)}
                        </td>
                    </>
                );
            },
        },
    ];

    function onHandleSort(column, order) {
        setSortColumn(column);
        setSortOrder(order);
    }

    useEffect(() => {
        async function getPermissionsList() {
            dispatch(getPermission());
        }
        getPermissionsList();
    }, []);

    function sortPermissions() {
        const column = columns.find((column) => column.name === sortColumn);
        const sortedPermissions = _.orderBy(
            permissions,
            column.path,
            sortOrder
        );
        return sortedPermissions;
    }

    function paginatePermissons() {
        const sortedPermissions = sortPermissions();
        const offset = (currentPage - 1) * limit;
        const paginatedPermissions = _.drop(sortedPermissions, offset).slice(
            0,
            limit
        );
        return paginatedPermissions;
    }

    function handleClick() {
        navigate("/permission-create");
    }

    return (
        <div className="container ">
            <div className="card">
                <Header headerText={"Permissions"} />
                <div className="card-body">
                    <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                    >
                        <button
                            className="btn btn-primary"
                            onClick={handleClick}
                        >
                            Create new
                        </button>
                    </div>

                    <TableLimit
                        onChange={(limit) => setLimit(limit)}
                        options={[
                            { name: "Five", value: 5 },
                            { name: "Ten", value: 10 },
                            { name: "Fifteen", value: 15 },
                        ]}
                    />

                    <Table
                        columns={columns}
                        items={paginatePermissons()}
                        sortColumn={sortColumn}
                        sortOrder={sortOrder}
                        onHandleSort={onHandleSort}
                    />
                    <Pagination
                        items={permissions}
                        limit={limit}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>
        </div>
    );
}

export default PermmissionTable;

/*
1. Table, List => 80%
2. Form => 15%
3. Route => 1%
4. Complex things => 4%
*/
