import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "../../../core/common/button.component";
import Label from "../../../core/common/label.component";
import InputError from "../../../core/common/input_error.component";
import { signInSchema } from "../user.schema";
import LOGO from "../../../../images/337656488_764133375266416_3958272406946239868_n.png";
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
            <div className="main-container">
                <div className="cardStyle">
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={signInSchema}
                    >
                        {(formik) => {
                            return (
                                <Form name="signupForm" id="signupForm">
                                    <img src={LOGO} id="signupLogo" />
                                    <h2 className="formTitle"> Login</h2>
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

                                    <div className="buttonWrapper tex-center">
                                        <Button
                                            type="submit"
                                            text="Sign In"
                                            disabled={formik.isValid ? false : true}
                                            className="submitButton"
                                        />
                                        <div className="d-flex justify-content-between">
                                            <p
                                                className="text-end mt-4"
                                                style={{ marginLeft: "75px" }}
                                            >
                                                <Link to="/signUp">Create New Account</Link>
                                            </p>
                                            <p
                                                className="text-end mt-4"
                                                style={{ marginRight: "75px" }}
                                            >
                                                <Link to="/forgetPassword">Forget Password</Link>
                                            </p>
                                        </div>
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
