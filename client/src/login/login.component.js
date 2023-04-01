import React, { useState } from "react";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import { Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Toastmsg from "../common/toast.component";
import { useNavigate } from "react-router-dom";

function Login() {
    const [login, setLogin] = useState({ error: "", loggedInn: false });

    const navigate = useNavigate();

    async function loginHandler(values) {
        try {
            const res = await axios.post("http://localhost:3000/users/login", {
                email: values.email,
                password: values.password,
            });
            if (res.status === 200) {
                localStorage.setItem("access_token", res.data);
                setLogin({
                    ...login,
                    loggedInn: true,
                });
            }
        } catch (err) {
            setLogin({
                ...login,
                error: "Invalid credintials",
            });
        }
    }

    login.loggedInn && navigate("/dashboard", { replace: true });

    return (
        <Container className="col-md-4">
            <div className="text-center ">
                <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                    style={{ width: "185px" }}
                    alt="logo"
                />
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
                                    className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                                    type="button"
                                >
                                    <i className="bi bi-envelope-check-fill"></i>
                                </button>
                            </span>
                            <Field
                                className="form-control border-end-0 border rounded-pill"
                                type="email"
                                id="form3Example3"
                                placeholder="Enter a valid email address"
                                name="email"
                                required
                            />
                        </div>

                        <div className="input-group mb-3">
                            <span className="input-group-append">
                                <button
                                    className="btn btn-outline-secondary bg-white border-bottom-0 border rounded-pill ms-n5"
                                    type="button"
                                >
                                    <i className="bi bi-key-fill"></i>
                                </button>
                            </span>
                            <Field
                                type="password"
                                className="form-control border-end-0 border rounded-pill"
                                id="form3Example4"
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
                                //<Toastmsg message={login.error} />
                            )}

                            <button
                                type="submit"
                                className="form-control btn btn-dark btn-lg"
                            >
                                Login
                            </button>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="form-check mb-0">
                                    <p className="small fw-bold mt-2 pt-1 mb-0">
                                        Don't have an account?{" "}
                                        <a href="#!" className="link-dark">
                                            Register
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </Container>
    );
}

export default Login;
