import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { shopSignUpSchema } from "./signup.schema";
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

    const onSubmit = async (values, { setSubmitting }) => {
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
            console.log(response);
            if (response.status === 201) {
                console.log(response);
            } else if (response.status === 400) {
                console.log("already registered");
            }
            setSubmitting(false);
        } catch (error) {
            console.log("internal server error", error);
            setSubmitting(false);
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
                                {({ errors, touched, isSubmitting }) => (
                                    <Form>
                                        <div>
                                            <label
                                                className="form-label"
                                                htmlFor="shopName"
                                            >
                                                Shop Name:
                                            </label>
                                            <Field
                                                className="form-control"
                                                type="text"
                                                id="shopName"
                                                name="shopName"
                                                placeholder="Enter your shopName"
                                            />
                                            <ErrorMessage name="shopName" />
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
                                            <ErrorMessage name="email" />
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
                                            <ErrorMessage name="password" />
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
                                            <ErrorMessage name="confirmPassword" />
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
                                            <ErrorMessage name="confirmPassword" />
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
                                            <ErrorMessage name="address" />
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
                                            <ErrorMessage name="city" />
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
                                            />
                                            <ErrorMessage name="country" />
                                        </div>

                                        <button
                                            type="submit"
                                            className="btn btn-primary mt-2"
                                        >
                                            Sign Up
                                        </button>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorSignUp;
