import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Modal from "react-bootstrap/Modal";

import Label from "../../core/components/label.component";
import Button from "../../core/components/button.component";
import InputError from "../../core/components/input_error.component";
import { validationSchema } from "../service.schema";
import { useDispatch, useSelector } from "react-redux";
import { getService, updateService } from "../service.actions";
import { toast } from "react-toastify";

const ServiceEdit = ({ onShow, onHandleClose, id }) => {
    const service = useSelector((state) => state.serviceReducer.service);
    const dispatch = useDispatch();

    useEffect(() => {
        async function editService() {
            dispatch(getService(id));
        }
        editService();
    }, [id]);

    if (id !== service.id) return false;

    const initialValues = {
        name: service.name,
        description: service.description,
    };

    const onSubmit = (values) => {
        async function update() {
            try {
                dispatch(updateService(values, id));
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
                                            htmlFor="last_name"
                                            text="Description"
                                        />
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="description"
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

export default ServiceEdit;
