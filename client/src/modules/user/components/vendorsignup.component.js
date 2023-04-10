import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { shopSignUpSchema } from "../user.schema";
import axios from "axios";

function VendorSignUp() {
    const initialValues = {
        shopName: "",
        email: "",
        password: "",
        confirmPassword: "",
        phoneNumber: "",
        address: "",
        city: "",
        country: "",
    };

    const onSubmit = async (values) => {
        console.log(values);
        try {
            const response = await axios.post("http://localhost:3000/vendors", {
                shopName: values.shopName,
                email: values.email,
                password: values.password,
                confirmPassword: values.confirmPassword,
                phoneNumber: values.phoneNumber,
                address: values.address,
                city: values.city,
                country: values.country,
            });
        } catch (error) {
            console.log("internal server error", error);
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div className="card my-5">
                        <div className="text-center card-header">
                            <h3>Shop</h3>
                        </div>
                        <div className="card-body cardbody-color p-lg-5">
                            <Formik
                                initialValues={initialValues}
                                validationSchema={shopSignUpSchema}
                                onSubmit={onSubmit}
                            >
                                {(formik) => {
                                    return (
                                        <Form>
                                            <div>
                                                <label
                                                    className="form-label"
                                                    htmlFor="shopName"
                                                >
                                                    Name:
                                                </label>
                                                <Field
                                                    className="form-control"
                                                    type="text"
                                                    id="shopName"
                                                    name="shopName"
                                                    placeholder="Enter your shopName"
                                                />
                                                <span class="text-danger">
                                                    <ErrorMessage name="shopName" />
                                                </span>
                                            </div>
                                            <div>
                                                <label
                                                    className="form-label"
                                                    htmlFor="email"
                                                >
                                                    Email:
                                                </label>
                                                <Field
                                                    className="form-control"
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    placeholder="Enter your email"
                                                />
                                                <span class="text-danger">
                                                    <ErrorMessage name="email" />
                                                </span>
                                            </div>
                                            <div>
                                                <label
                                                    className="form-label"
                                                    htmlFor="password"
                                                >
                                                    Password:
                                                </label>
                                                <Field
                                                    className="form-control"
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Enter your password"
                                                />
                                                <span class="text-danger">
                                                    <ErrorMessage name="password" />
                                                </span>
                                            </div>
                                            <div>
                                                <label
                                                    className="form-label"
                                                    htmlFor="confirmPassword"
                                                >
                                                    Confirm Password:
                                                </label>
                                                <Field
                                                    className="form-control"
                                                    type="password"
                                                    id="confirmPassword"
                                                    name="confirmPassword"
                                                    placeholder="Enter your password again"
                                                />
                                                <span class="text-danger">
                                                    <ErrorMessage name="confirmPassword" />
                                                </span>
                                            </div>
                                            <div>
                                                <label
                                                    className="form-label"
                                                    htmlFor="phoneNumber"
                                                >
                                                    Phone Number:
                                                </label>
                                                <Field
                                                    className="form-control"
                                                    type="tel"
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    placeholder="Enter your phone number"
                                                />
                                                <span class="text-danger">
                                                    <ErrorMessage name="phoneNumber" />
                                                </span>
                                            </div>
                                            <div>
                                                <label
                                                    className="form-label"
                                                    htmlFor="address"
                                                >
                                                    Address:
                                                </label>
                                                <Field
                                                    className="form-control"
                                                    type="text"
                                                    id="address"
                                                    name="address"
                                                    placeholder="Enter your Address"
                                                />
                                                <span class="text-danger">
                                                    <ErrorMessage name="address" />
                                                </span>
                                            </div>
                                            <div>
                                                <label
                                                    className="form-label"
                                                    htmlFor="city"
                                                >
                                                    City:
                                                </label>
                                                <Field
                                                    className="form-control"
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    placeholder="Enter your City"
                                                />
                                                <span class="text-danger">
                                                    <ErrorMessage name="city" />
                                                </span>
                                            </div>
                                            <div>
                                                <label
                                                    className="form-label"
                                                    htmlFor="country"
                                                >
                                                    Country:
                                                </label>
                                                <Field
                                                    className="form-control"
                                                    type="text"
                                                    id="country"
                                                    name="country"
                                                    placeholder="Enter your Country"
                                                />
                                                <span class="text-danger">
                                                    <ErrorMessage name="country" />
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
}

export default VendorSignUp;
