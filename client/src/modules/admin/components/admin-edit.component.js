import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-bootstrap/Modal";

import Label from "../../core/components/label.component";
import Button from "../../core/components/button.component";
import InputError from "../../core/components/input_error.component";
import { validationSchema } from "../admin.schema";
import { useDispatch, useSelector } from "react-redux";
import { getAdmin, updateAdmin } from "../admin.actions";
import { toast } from "react-toastify";

const AdminEdit = ({ onShow, onHandleClose, id }) => {
    const admin = useSelector((state) => state.adminReducer.admin);
    const dispatch = useDispatch();

    useEffect(() => {
        async function editAdmin() {
            dispatch(getAdmin(id));
        }
        editAdmin();
    }, [id]);

    if (id !== admin.id) return false;

    const initialValues = {
        first_name: admin.first_name,
        last_name: admin.last_name,
        username: admin.username,
        email: admin.email,
        password: admin.password,
        confirm_password: admin.password,
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
                        validationSchema={validationSchema}
                    >
                        {(formik) => {
                            return (
                                <Form className="row card p-3 d-flex flex-column  m-auto">
                                    <h4 className="text-center text-success">
                                        Modify Admin Info
                                    </h4>

                                    <div className="form-group my-1 ">
                                        <Label
                                            className="form-label"
                                            htmlFor="first_name"
                                            text="First Name"
                                        />
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="first_name"
                                        />
                                        <ErrorMessage
                                            name="first_name"
                                            component={InputError}
                                        />
                                    </div>

                                    <div className="form-group my-1 ">
                                        <Label
                                            className="form-label"
                                            htmlFor="last_name"
                                            text="Last Name"
                                        />
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="last_name"
                                        />
                                        <ErrorMessage
                                            name="last_name"
                                            component={InputError}
                                        />
                                    </div>

                                    <div className="form-group my-1 ">
                                        <Label
                                            className="form-label"
                                            htmlFor="username"
                                            text="User Name"
                                        />
                                        <Field
                                            type="username"
                                            className="form-control"
                                            name="username"
                                        />
                                        <ErrorMessage
                                            name="username"
                                            component={InputError}
                                        />
                                    </div>

                                    <div className="form-group my-1 ">
                                        <Label
                                            className="form-label"
                                            htmlFor="email"
                                            text="Email"
                                        />
                                        <Field
                                            type="email"
                                            className="form-control"
                                            name="email"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            component={InputError}
                                        />
                                    </div>

                                    <div className="form-group my-1">
                                        <Label
                                            className="form-label"
                                            htmlFor="password"
                                            text="New Password"
                                        />
                                        <Field
                                            type="password"
                                            className="form-control"
                                            name="password"
                                        />
                                        <ErrorMessage
                                            name="password"
                                            component={InputError}
                                        />
                                    </div>

                                    <div className="form-group my-1">
                                        <Label
                                            className="form-label"
                                            htmlFor="confirm_password"
                                            text="Confirm Password"
                                        />
                                        <Field
                                            type="password"
                                            className="form-control"
                                            name="confirm_password"
                                        />
                                        <ErrorMessage
                                            name="confirm_password"
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

export default AdminEdit;
