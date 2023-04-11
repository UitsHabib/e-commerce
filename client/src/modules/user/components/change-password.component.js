import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "../../core/components/button.component";
import Label from "../../core/components/label.component";
import InputError from "../../core/components/input_error.component";
import { validationSchema } from "../user.schema";
import getUser from "../user.actions";

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const users = useSelector((state) => state.userReducer.userList);

    const initialValues = {
        email: "",
        password: "",
        confirm_password: "",
    };
    useEffect(() => {
        async function userList() {
            dispatch(getUser());
        }
        userList();
    }, []);

    const onSubmit = ({ email, password }) => {
        async function checkAuth() {
            try {
                const url = `https://dummyjson.com/users/filter`;
                const firstQuery = `key=email&value=${email}`;

                const isAuthenticatedUser = await axios.get(
                    `${url}?${firstQuery}`
                );

                isAuthenticatedUser.data.users.length > 0
                    ? navigate("/")
                    : alert("Unathorized");
            } catch (err) {
                console.log(err);
            }
        }
        checkAuth();
    };

    return (
        <div>
            <div className="container my-5">
                <div>
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {(formik) => {
                            return (
                                <Form className="row card p-3 col-md-4 d-flex flex-column  m-auto">
                                    <h3 className="text-center text-success">
                                        {" "}
                                        Change Password
                                    </h3>

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
                                        />
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
