import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "../../../core/common/button.component";
import Label from "../../../core/common/label.component";
import InputError from "../../../core/common/input_error.component";
import { LoginSchema } from "../user.schema";
import { Link } from "react-router-dom";

const Login = () => {
    const initialValues = {
        email: "",
        password: "",
    };
    const onSubmit = (values) => {
        console.log(values);
    };
    return (
        <>
            <div className="container card mt-5" style={{ width: "40%" }}>
                <div className="card-body px-5">
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={LoginSchema}
                    >
                        {(formik) => {
                            return (
                                <Form name="signupForm" id="signupForm">
                                    <h2 className="fs-3 fw-bold text-center"> Login</h2>
                                    <div className="mt-2">
                                        <Label
                                            className="form-label"
                                            htmlFor="email"
                                            text="Email"
                                        />
                                        <Field
                                            type="email"
                                            placeholder="Enter your email"
                                            className="form-control"
                                            name="email"
                                        />
                                        <div className="invaild-feedback">
                                            <ErrorMessage name="email" component={InputError} />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <Label
                                            className="form-label"
                                            htmlFor="password"
                                            text="Password"
                                        />
                                        <Field
                                            type="password"
                                            placeholder="Enter your password"
                                            className="form-control"
                                            name="password"
                                        />
                                        <div className="invaild-feedback">
                                            <ErrorMessage name="password" component={InputError} />
                                        </div>
                                    </div>

                                    <div className="form-group mt-3 text-center">
                                        <Button
                                            type="submit"
                                            text="Login"
                                            className="btn btn-primary"
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <p className="text-end mt-4" style={{ marginLeft: "5px" }}>
                                            <Link to="/registration">Create New Account</Link>
                                        </p>
                                        <p className="text-end mt-4" style={{ marginRight: "5px" }}>
                                            <Link to="/forgetPassword">Forget Password</Link>
                                        </p>
                                    </div>
                                </Form>
                            );
                        }}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Login;
