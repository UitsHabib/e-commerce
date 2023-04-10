import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Button from "../common/button.component";
import Label from "../common/label.component";

const EditAdmin = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [admin, setAdmin] = useState({
        firstName: "",
        lastName: "",
        email: "",
    });
    console.log(id);
    const { firstName, lastName, email } = admin;
    const onInputChange = (e) => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/admins/${id}`, admin);
        navigate("/admin-list");
    };

    const getEditAdmin = async () => {
        const { data } = await axios.get(`http://localhost:5000/admins/${id}`);
        setAdmin(data);
    };
    useEffect(() => {
        getEditAdmin();
    }, []);
    return (
        <>
            <div className="container card mt-5" style={{ width: "40%" }}>
                <h3 className="text-center fs-2 fw-bold p-4">Edit Admin</h3>
                <div className="card-body px-5">
                    <Formik>
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
                                            text="Update"
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

export default EditAdmin;

/*
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const EditUser = () => {
  let history = useHistory();
  const { id } = useParams();
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

  useEffect(() => {
    loadUser();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.put(
      `https://60decafeabbdd9001722d05c.mockapi.io/users/${id}`,
      user
    );
    history.push("/");
  };

  const loadUser = async () => {
    const result = await axios.get(
      `https://60decafeabbdd9001722d05c.mockapi.io/users/${id}`
    );
    setUser(result.data);
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Edit A User</h2>
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
          <button className="btn btn-warning btn-block">Update User</button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;

*/
