import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { crateAdminValidation } from "./admin.schema";
import Button from "../common/button.component";
import Label from "../common/label.component";

const CreateAdmin = () => {
    const navigate = useNavigate();
    const [createAdmin, setCreateAdmin] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    const { firstName, lastName, email } = createAdmin;
    const onInputChange = (e) => {
        setCreateAdmin({ ...createAdmin, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/admins", createAdmin);
            alert("admin create successful");
            navigate("/admin-list");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="container card mt-5" style={{ width: "40%" }}>
                <h3 className="text-center fs-2 fw-bold p-4">Create Admin</h3>
                <div className="card-body px-5">
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            email: "",
                        }}
                        validationSchema={crateAdminValidation}
                        onSubmit={(values) => {
                            console.log(values);
                        }}
                    >
                        {(formik) => {
                            return (
                                <Form onSubmit={(e) => submitHandler(e)}>
                                    <div>
                                        <Label
                                            className="form-label"
                                            htmlFor="firstName"
                                            text="First Name"
                                        />
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            value={firstName}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            className="form-label"
                                            htmlFor="lastName"
                                            text="Last Name"
                                        />
                                        <Field
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            value={lastName}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            className="form-label"
                                            htmlFor="email"
                                            text="Email"
                                        />
                                        <Field
                                            type="email"
                                            className="form-control"
                                            name="email"
                                            value={email}
                                            onChange={(e) => onInputChange(e)}
                                        />
                                    </div>

                                    <div className="form-group mt-3 text-center">
                                        <Button
                                            type="submit"
                                            text="Create"
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

export default CreateAdmin;

/*
import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { Formik } from "formik";
import * as Yup from "yup";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: ""
  });

  const { name, username, email, phone, website } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("https://60decafeabbdd9001722d05c.mockapi.io/users", user);
    history.push("/");
  };

  const validate = Yup.object({
    name: Yup.string()
      .min(4, "Must be 4 charecters or more")
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    username: Yup.string()
      .min(4, "Must be 4 charecters or more")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string()
      .email("Enter valid Email")
      .required("Email is required"),
    phone: Yup.string()
      .min(6, "Number must be at least 6 charaters")
      .required("Number is required"),
    website: Yup.string()
      .min(6, "Number must be at least 6 charaters")
      .required("Number is required")
  });
  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        email: "",
        phone: "",
        website: ""
      }}
      validationSchema={validate}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => (
        <div className="container">
          <div className="w-75 mx-auto shadow p-5">
            <h2 className="text-center mb-4">Add A User</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Name"
                  name="name"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Username"
                  name="username"
                  value={username}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter Your E-mail Address"
                  name="email"
                  value={email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Phone Number"
                  name="phone"
                  value={phone}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Website Name"
                  name="website"
                  value={website}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button className="btn btn-primary btn-block">Add User</button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddUser;


*/
