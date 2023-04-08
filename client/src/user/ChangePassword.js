import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "../common/button.component";
import Label from "../common/label.component";
import InputError from "../common/input_error.component";
import { validationSchema } from "./user.schema";

const ChangePassword = () => {
  const initialValues = {
    email: "",
    password: "",
    confirm_password: "",
  };

  const onSubmit = (values) => {
    console.log("values", values);
  };

  return (
    <div>
      <div className="change_password">
        <div className="cardStyle">
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            {(formik) => {
              return (
                <Form action="" method="post" name="signupForm" id="signupForm">
                  <h2 className="formTitle"> Change Password</h2>

                  <div className="inputDiv">
                    <Label
                      className="inputLabel"
                      htmlFor="email"
                      text="Email"
                    />
                    <Field type="email" className="custom_input" name="email" />
                    <ErrorMessage name="email" component={InputError} />
                  </div>

                  <div className="inputDiv">
                    <Label
                      className="inputLabel"
                      htmlFor="password"
                      text="New Password"
                    />
                    <Field
                      type="password"
                      className="custom_input"
                      name="password"
                    />
                    <ErrorMessage name="password" component={InputError} />
                  </div>

                  <div className="inputDiv">
                    <Label
                      className="inputLabel"
                      htmlFor="confirm_password"
                      text="Confirm Password"
                    />
                    <Field
                      type="password"
                      className="custom_input"
                      name="confirm_password"
                    />
                    <ErrorMessage
                      name="confirm_password"
                      component={InputError}
                    />
                  </div>

                  <div className="buttonWrapper text-center">
                    <Button
                      type="submit"
                      text="Submit"
                      className={"btn btn-primary"}
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

export default ChangePassword;
