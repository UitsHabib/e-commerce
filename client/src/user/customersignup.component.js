import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { customerSignUpSchema } from "./signup.schema";

import axios from "axios";

const onSubmit = async (values, { setSubmitting }) => {
    try {
        console.log(values);
        const response = await axios.post("http://localhost:3000/users", {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        });
        if (response.status === 201) {
            console.log(response);
        } else if (response.status === 400) {
            console.log("already registered");
        }
        setSubmitting(false);
    } catch (error) {
        console.log("internal server error", error);
    }
};

const CustomerSignUp = () => {
    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agree: false,
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card my-5">
                        <div className="text-center card-header">
                            <h3>Customer</h3>
                        </div>
                        <div className="card-body cardbody-color p-lg-5">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={customerSignUpSchema}
                                onSubmit={onSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form>
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    htmlFor="firstName"
                                                >
                                                    First Name
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="firstName"
                                                    name="firstName"
                                                    placeholder="Enter your first name"
                                                />
                                                <ErrorMessage
                                                    name="firstName"
                                                    // component="div"
                                                    // className="invalid-feedback"
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    htmlFor="lastName"
                                                >
                                                    Last Name
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="lastName"
                                                    name="lastName"
                                                    placeholder="Enter your last name"
                                                />
                                                <ErrorMessage name="lastName" />
                                            </div>
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    htmlFor="email"
                                                >
                                                    Email
                                                </label>
                                                <Field
                                                    type="text"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Enter your email"
                                                />
                                                <ErrorMessage name="email" />
                                            </div>
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    htmlFor="password"
                                                >
                                                    New Password
                                                </label>
                                                <Field
                                                    type="password"
                                                    className="form-control"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Enter a new password"
                                                />
                                                <ErrorMessage name="password" />
                                            </div>
                                            <div className="form-group">
                                                <label
                                                    className="form-label"
                                                    htmlFor="confirmPassword"
                                                >
                                                    Confirm Password
                                                </label>
                                                <Field
                                                    type="password"
                                                    className="form-control"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    placeholder="Confirm your new password"
                                                />
                                                <ErrorMessage name="confirmPassword" />
                                            </div>

                                            <div className="form-group form-check">
                                                <Field
                                                    type="checkbox"
                                                    id="agree"
                                                    name="agree"
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor="agree"
                                                >
                                                    I agree to the terms and
                                                    conditions
                                                </label>
                                                <ErrorMessage name="agree" />
                                            </div>
                                            <button
                                                type="submit"
                                                className="btn btn-primary mt-2"
                                            >
                                                Sign Up
                                            </button>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomerSignUp;
