import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getServices } from "../service.actions";
import Table from "../../core/components/table/table.component";
import ServiceCreate from "./service-form.component";
import ServiceEdit from "./service-edit.component";
import ServiceDelete from "./service-remove.component";

const ServiceList = () => {
    const dispatch = useDispatch();
    const service = useSelector((state) => state.serviceReducer.serviceList);
    console.log(".......................", service);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [deleteShow, setDeleteShow] = useState(false);
    const [id, setId] = useState("");

    useEffect(() => {
        async function serviceList() {
            dispatch(getServices());
        }
        serviceList();
    }, []);

    const handleServiceEdit = (data) => {
        setEditShow(true);
        setId(data.id);
    };

    const handleServiceDelete = (data) => {
        setDeleteShow(true);
        setId(data.id);
    };

    const columns = [
        {
            name: "Id",
            path: "id",
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
                            onClick={() => handleServiceEdit(data)}
                            className="btn btn-sm btn-info text-white"
                        >
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button
                            onClick={() => handleServiceDelete(data)}
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
                        data={service}
                        limit={5}
                        sorting={true}
                        pagination={false}
                    />
                </div>
            </div>

            <ServiceCreate
                onShow={addShow}
                onHandleClose={() => setAddShow(false)}
            />

            <ServiceEdit
                onShow={editShow}
                id={id}
                onHandleClose={() => setEditShow(false)}
            />
            <ServiceDelete
                onShow={deleteShow}
                id={id}
                onHandleClose={() => setDeleteShow(false)}
            />
        </div>
    );
};

export default ServiceList;
