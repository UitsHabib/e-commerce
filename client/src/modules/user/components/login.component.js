import React, { useState, useEffect } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const token = localStorage.getItem("access_token");

function Login() {
    const [login, setLogin] = useState({ error: "", loggedInn: false });

    const navigate = useNavigate();

    async function loginHandler(values) {
        try {
            const res = await axios.post(
                "http://localhost:3000/users/login",
                {
                    email: values.email,
                    password: values.password,
                },
                {
                    withCredentials: true,
                }
            );

            if (res.status === 200) {
                setLogin({
                    ...login,
                    loggedInn: true,
                });
            }
        } catch (err) {
            setLogin({
                ...login,
                error: "Invalid credentials",
            });
        }
    }

    login.loggedInn && navigate("/dashboard", { replace: true });

    return (
        <Container className="col-md-4 mt-5">
            <div className="text-center ">
                <h4 className="mt-1 mb-5 pb-1">e-Commerce</h4>
            </div>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={(values, e) => {
                    loginHandler(values);
                    e.setSubmitting(false);
                }}
            >
                {(formik) => (
                    <Form>
                        <div className="input-group mb-3">
                            <span className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary bg-white border ms-n5"
                                    type="button"
                                >
                                    <i className="bi bi-envelope-check-fill"></i>
                                </button>
                            </span>
                            <Field
                                className="form-control border"
                                type="email"
                                placeholder="Enter a valid email address"
                                name="email"
                                required
                            />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary bg-white border ms-n5"
                                    type="button"
                                >
                                    <i className="bi bi-key-fill"></i>
                                </button>
                            </span>
                            <Field
                                type="password"
                                className="form-control border"
                                name="password"
                                placeholder="Enter password"
                                required
                            />
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <p className="small mt-2 pt-1 mb-0">
                                <a href="#!" className="text-body">
                                    Forgot password?
                                </a>
                            </p>
                        </div>

                        <div className="text-center text-lg-start mt-2 pt-2">
                            {login.error && (
                                <div className="text-danger ">
                                    <strong>Error! </strong>
                                    {login.error}
                                </div>
                            )}

                            <button
                                type="submit"
                                className="form-control btn btn-primary"
                            >
                                Login
                            </button>

                            <div className="d-flex justify-content-between align-items-center">
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account?{" "}
                                    <a href="#!" className="link-dark">
                                        Register
                                    </a>
                                </p>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default Login;
