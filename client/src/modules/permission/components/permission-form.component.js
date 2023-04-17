// import React from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { permissionCreateSchema } from "../permission.schema";

// const onSubmit = async (values) => {
//     console.log("Valuesssssssssss", values);
//     // try {
//     //     const response = await axios.post("http://localhost:3000/users", {
//     //         name: values.name,
//     //         description: values.description,
//     //     });
//     //     console.log("MY response", response);
//     // } catch (error) {
//     //     console.log("internal server error", error);
//     // }
// };

// const PermissionCreate = () => {
//     const initialValues = {
//         name: "",
//         description: "",
//     };
//     return (
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-6 offset-md-3">
//                     <div className="card my-5">
//                         <div className="text-center card-header">
//                             <h3>Permission</h3>
//                         </div>
//                         <div className="card-body cardbody-color p-lg-5">
//                             <Formik
//                                 initialValues={initialValues}
//                                 validationSchema={permissionCreateSchema}
//                                 onSubmit={onSubmit}
//                             >
//                                 {(formik) => {
//                                     return (
//                                         <Form>
//                                             <div className="form-group">
//                                                 <label
//                                                     className="form-label"
//                                                     htmlFor="name"
//                                                 >
//                                                     Name
//                                                 </label>
//                                                 <Field
//                                                     type="text"
//                                                     className="form-control"
//                                                     id="name"
//                                                     name="name"
//                                                     placeholder="Enter a permission name"
//                                                 />
//                                                 <span class="text-danger">
//                                                     <ErrorMessage name="name" />
//                                                 </span>
//                                             </div>
//                                             <div className="form-group">
//                                                 <label
//                                                     className="form-label"
//                                                     htmlFor="description"
//                                                 >
//                                                     Description
//                                                 </label>
//                                                 <Field
//                                                     type="text"
//                                                     name="description"
//                                                     className="form-control"
//                                                     id="description"
// style={{ height: "140px" }}
// as="textarea"
// rows={5}
// placeholder="Write a description here..."
//                                                 />
//                                                 <span class="text-danger">
//                                                     <ErrorMessage name="description" />
//                                                 </span>
//                                             </div>

//                                             <button
//                                                 type="submit"
//                                                 className="btn btn-primary mt-2"
//                                             >
//                                                 Create
//                                             </button>
//                                         </Form>
//                                     );
//                                 }}
//                             </Formik>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PermissionCreate;

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

import InputError from "../../core/components/input_error.component";
// import { validationSchema } from "../../admin/admin.schema";
import { permissionCreateSchema } from "../permission.schema";
import { useDispatch } from "react-redux";
// import { getAdmins, storeAdmin } from "../../admin/admin.actions";
import { getPermissions, storePermission } from "../permission.action";
import Button from "../../core/components/button.component";
import Label from "../../core/components/label.component";

const PermissionCreate = ({ onShow, onHandleClose }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        async function permissionList() {
            dispatch(getPermissions());
        }
        permissionList();
    }, []);

    const initialValues = {
        name: "",
        description: "",
    };

    const onSubmit = (values) => {
        async function store() {
            try {
                dispatch(storePermission(values));
                toast("Permission Created!");
            } catch (err) {
                toast.error("Something went wrong");
            }
        }
        store();
    };

    return (
        <Modal show={onShow} onHide={onHandleClose}>
            <Modal.Body>
                <div className="d-flex justify-content-end m-0 p-0">
                    <Button
                        className=" btn-danger btn-sm font-weight-bold px-2 m-0 py-1"
                        onEvent={onHandleClose}
                        text="x"
                    />
                </div>

                <div className="container my-2">
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={permissionCreateSchema}
                    >
                        {(formik) => {
                            return (
                                <Form className="row card p-3 d-flex flex-column  m-auto">
                                    <h4 className="text-center text-success">
                                        {" "}
                                        Create Permission
                                    </h4>

                                    <div className="form-group my-1 ">
                                        <Label
                                            className="form-label"
                                            htmlFor="name"
                                            text="Name"
                                        />
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="name"
                                        />
                                        <ErrorMessage
                                            name="name"
                                            component={InputError}
                                        />
                                    </div>

                                    <div className="form-group my-1 ">
                                        <Label
                                            className="form-label"
                                            htmlFor="description"
                                            text="Description"
                                        />
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="description"
                                            style={{ height: "140px" }}
                                            as="textarea"
                                            rows={5}
                                            placeholder="Write a description here..."
                                        />
                                        <ErrorMessage
                                            name="description"
                                            component={InputError}
                                        />
                                    </div>

                                    <div className="form-group text-center my-2">
                                        <Button
                                            type="submit"
                                            text="Submit"
                                            className={"btn btn-primary"}
                                            onEvent={onHandleClose}
                                        />
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default PermissionCreate;
