import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "../common/button.component";
import Label from "../common/label.component";
import InputError from "../common/input_error.component";
import { forgetPasswordValidationSchema } from "../user.schema";

const ForgetPassword = () => {
    const initialValues = {
        email: "",
    };

    const onSubmit = (values) => {
        console.log("values", values);
    };
    return (
        <>
            <div className="container card mt-5" style={{ width: "40%" }}>
                <div className="card-body px-5">
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={forgetPasswordValidationSchema}
                    >
                        {(formik) => {
                            return (
                                <Form>
                                    <div>
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

                                    <div className="form-group mt-3 text-center">
                                        <Button
                                            type="submit"
                                            text="Send"
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

export default ForgetPassword;
