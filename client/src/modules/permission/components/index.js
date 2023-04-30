import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getPermissions } from "../permission.action";
import Table from "../../core/components/table/table.component";
import PermissionCreate from "./permission-form.component";
import PermissionEdit from "./permission-edit.component";
import PermissionDelete from "./permission-remove.component";

const PermissionList = () => {
    const dispatch = useDispatch();
    const permissions = useSelector(
        (state) => state.permissionReducer.permisssionList
    );
    console.log("-----------------------------------", permissions);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        async function permisssionList() {
            dispatch(getPermissions());
        }
        permisssionList();
    }, []);

    const handlePermissionEdit = (data) => {
        setEditShow(true);
        setId(data.id);
    };

    const handlePermissionDelete = (data) => {
        setDeleteShow(true);
        setId(data.id);
    };

    const columns = [
        {
            name: "Id",
            path: "id",
        },
        {
            name: "Name",
            path: "name",
        },
        {
            name: "Description",
            path: "description",
        },

        {
            name: "Action",
            getContent: (data, index) => {
                return (
                    <td key={`col-${index}`}>
                        <button
                            onClick={() => handlePermissionEdit(data)}
                            className="btn btn-sm btn-info text-white"
                        >
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button
                            onClick={() => handlePermissionDelete(data)}
                            className="btn btn-sm btn-danger text-white mx-1"
                        >
                            <i className="bi bi-trash"></i>
                        </button>
                    </td>
                );
            },
        },
    ];

    return (
        <div className="card shadow mb-1">
            <div className="card-header  d-flex justify-content-between">
                <div></div>
                {/* <h6 className="m-0 font-weight-bold text-primary">Admin List</h6> */}
                <button
                    className="btn btn-sm btn-success"
                    onClick={() => setAddShow(true)}
                >
                    Add
                </button>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    <Table
                        columns={columns}
                        data={permissions}
                        limit={5}
                        sorting={false}
                        pagination={false}
                    />
                </div>
            </div>

            <PermissionCreate
                onShow={addShow}
                onHandleClose={() => setAddShow(false)}
            />

            <PermissionEdit
                onShow={editShow}
                id={id}
                onHandleClose={() => setEditShow(false)}
            />
            <PermissionDelete
                onShow={deleteShow}
                id={id}
                onHandleClose={() => setDeleteShow(false)}
            />
        </div>
    );
};

export default PermissionList;
