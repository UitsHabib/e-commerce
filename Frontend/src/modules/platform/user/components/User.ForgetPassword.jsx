import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "../../../core/common/button.component";
import Label from "../../../core/common/label.component";
import InputError from "../../../core/common/input_error.component";
import { forgetPasswordSchema } from "../user.schema";

import LOGO from "../../../../images/337656488_764133375266416_3958272406946239868_n.png";

const ForgetPassword = () => {
    const initialValues = {
        email: "",
    };

    const onSubmit = (values) => {
        console.log("values", values);
    };
    return (
        <div>
            <div className="main-container">
                <div className="cardStyle">
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={forgetPasswordSchema}
                    >
                        {(formik) => {
                            return (
                                <Form name="signupForm" id="signupForm">
                                    <img src={LOGO} id="signupLogo" />
                                    <h2 className="formTitle"> Forget Password</h2>
                                    <p className="text-center mx-2">
                                        Enter your email address and we'll send you an email with
                                        instructions to reset your password.
                                    </p>

                                    <div className="inputDiv">
                                        <Label
                                            className="inputLabel"
                                            htmlFor="email"
                                            text="Email"
                                        />
                                        <Field
                                            type="email"
                                            placeholder="enter your email"
                                            className="custom_input"
                                            name="email"
                                        />
                                        <ErrorMessage name="email" component={InputError} />
                                    </div>

                                    <div className="buttonWrapper">
                                        <Button
                                            type="submit"
                                            text="Sent to Email"
                                            disabled={formik.isValid ? false : true}
                                            className="submitButton"
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

export default ForgetPassword;
