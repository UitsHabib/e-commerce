import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { customerSignUpSchema } from "../signup.schema";

import axios from "axios";

const onSubmit = async (values) => {
    console.log("valueee", values);
    try {
        const response = await axios.post("http://localhost:3000/users", {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
        });
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
                                                <span class="text-danger">
                                                    <ErrorMessage name="firstName" />
                                                </span>
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
                                                <span class="text-danger">
                                                    <ErrorMessage name="lastName" />
                                                </span>
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

                                                <span class="text-danger">
                                                    <ErrorMessage name="email" />
                                                </span>
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
                                                <span class="text-danger">
                                                    <ErrorMessage name="password" />
                                                </span>
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

                                                <span class="text-danger">
                                                    <ErrorMessage name="confirmPassword" />
                                                </span>
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
                                                <span class="text-danger">
                                                    <ErrorMessage name="agree" />
                                                </span>
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
