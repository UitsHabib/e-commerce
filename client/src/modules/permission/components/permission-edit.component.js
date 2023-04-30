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

// const PermissionUpdate = () => {
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
//                                                     style={{ height: "140px" }}
//                                                     as="textarea"
//                                                     rows={5}
//                                                     placeholder="Write a description here..."
//                                                 />
//                                                 <span class="text-danger">
//                                                     <ErrorMessage name="description" />
//                                                 </span>
//                                             </div>

//                                             <button
//                                                 type="submit"
//                                                 className="btn btn-primary mt-2"
//                                             >
//                                                 Update
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

// export default PermissionUpdate;

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-bootstrap/Modal";

import Label from "../../core/components/label.component";
import Button from "../../core/components/button.component";
import InputError from "../../core/components/input_error.component";
// import { validationSchema } from "../../admin/admin.schema";
import { permissionUpdateSchema } from "../permission.schema";
import { useDispatch, useSelector } from "react-redux";
// import { getAdmin, updateAdmin } from "../../admin/admin.actions";
import { getPermission, updatePermission } from "../permission.action";
import { toast } from "react-toastify";

const PermissionEdit = ({ onShow, onHandleClose, id }) => {
    const permission = useSelector(
        (state) => state.permissionReducer.permission
    );
    const dispatch = useDispatch();

    useEffect(() => {
        async function editPermission() {
            dispatch(getPermission(id));
        }
        editPermission();
    }, [id]);

    if (id !== permission.id) return false;

    const initialValues = {
        name: permission.name,
        description: permission.description,
    };

    const onSubmit = (values) => {
        async function update() {
            try {
                dispatch(updateAdmin(values, id));
                toast("Successfully updated");
            } catch (err) {
                toast.error("Something went wrong");
            }
        }
        update();
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
                        validationSchema={permissionUpdateSchema}
                    >
                        {(formik) => {
                            return (
                                <Form className="row card p-3 d-flex flex-column  m-auto">
                                    <h4 className="text-center text-success">
                                        Modify Permission Info
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

export default PermissionEdit;
