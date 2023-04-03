import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { RegistrationSchema } from "../user.schema";

import Button from "../../../core/common/button.component";
import Label from "../../../core/common/label.component";
import InputError from "../../../core/common/input_error.component";

const Registration = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
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
                        validationSchema={RegistrationSchema}
                    >
                        {(formik) => {
                            return (
                                <Form name="signupForm" id="signupForm">
                                    <h2 className="fs-3 text-center fw-bold"> Register</h2>
                                    <div className="mt-2">
                                        <Label
                                            className="form-label"
                                            htmlFor="firstName"
                                            text="First Name"
                                        />
                                        <Field
                                            type="text"
                                            placeholder="Enter your first name"
                                            className="form-control"
                                            name="firstName"
                                        />
                                        <div className="invaild-feedback">
                                            <ErrorMessage name="firstName" component={InputError} />
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <Label
                                            className="form-label"
                                            htmlFor="lastName"
                                            text="Last Name"
                                        />
                                        <Field
                                            type="text"
                                            placeholder="Enter your last name"
                                            className="form-control"
                                            name="lastName"
                                        />
                                        <div className="invaild-feedback">
                                            <ErrorMessage name="lastName" component={InputError} />
                                        </div>
                                    </div>
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
                                    <div className="mt-2">
                                        <Label
                                            className="form-label"
                                            htmlFor="confirmPassword"
                                            text="Confrim Password"
                                        />
                                        <Field
                                            type="password"
                                            placeholder="Enter your password"
                                            className="form-control"
                                            name="confirmPassword"
                                        />
                                        <div className="invaild-feedback">
                                            <ErrorMessage
                                                name="confirmPassword"
                                                component={InputError}
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group mt-3 text-center">
                                        <Button
                                            type="submit"
                                            text="Register"
                                            className="btn btn-primary"
                                        />
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

export default Registration;
