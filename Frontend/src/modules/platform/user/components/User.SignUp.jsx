import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpSchema } from "../user.schema";

import Button from "../../../core/common/button.component";
import Label from "../../../core/common/label.component";
import InputError from "../../../core/common/input_error.component";
import LOGO from "../../../../images/337656488_764133375266416_3958272406946239868_n.png";

const SignUp = () => {
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
            <div className="main-container">
                <div className="cardStyle">
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={signUpSchema}
                    >
                        {(formik) => {
                            return (
                                <Form name="signupForm" id="signupForm">
                                    <img src={LOGO} id="signupLogo" />
                                    <h2 className="formTitle"> Sign Up here</h2>
                                    <div className="inputDiv">
                                        <Label
                                            className="inputLabel"
                                            htmlFor="firstName"
                                            text="First Name"
                                        />
                                        <Field
                                            type="text"
                                            placeholder="enter your first name"
                                            className="custom_input"
                                            name="firstName"
                                        />
                                        <ErrorMessage name="firstName" component={InputError} />
                                    </div>
                                    <div className="inputDiv">
                                        <Label
                                            className="inputLabel"
                                            htmlFor="lastName"
                                            text="Last Name"
                                        />
                                        <Field
                                            type="text"
                                            placeholder="enter your last name"
                                            className="custom_input"
                                            name="lastName"
                                        />
                                        <ErrorMessage name="lastName" component={InputError} />
                                    </div>
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
                                    <div className="inputDiv">
                                        <Label
                                            className="inputLabel"
                                            htmlFor="password"
                                            text="Password"
                                        />
                                        <Field
                                            type="password"
                                            placeholder="enter your password"
                                            className="custom_input"
                                            name="password"
                                        />
                                        <ErrorMessage name="password" component={InputError} />
                                    </div>
                                    <div className="inputDiv">
                                        <Label
                                            className="inputLabel"
                                            htmlFor="confirmPassword"
                                            text="Confrim Password"
                                        />
                                        <Field
                                            type="password"
                                            placeholder="enter your password"
                                            className="custom_input"
                                            name="confirmPassword"
                                        />
                                        <ErrorMessage
                                            name="confirmPassword"
                                            component={InputError}
                                        />
                                    </div>

                                    <div className="buttonWrapper tex-center">
                                        <Button
                                            type="submit"
                                            text="Sign Up"
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
        </>
    );
};

export default SignUp;
