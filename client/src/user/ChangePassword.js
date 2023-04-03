import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import Button from '../common/button.component';
import Label from '../common/label.component';
import InputError from '../common/input_error.component';
import { validationSchema } from './user.schema';

const ChangePassword = () => {

    const initialValues = {
        email: '',
        password: '',
        confirm_password: ""
    }

    const onSubmit = values => {
        console.log('values', values)
    }

    return (
        <div>
            <div className="container my-5">
                <div >
                    <Formik
                        onSubmit={onSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {
                            (formik) => {

                                return <Form
                                            className="row card p-3 col-md-4 d-flex flex-column  m-auto"
                                        >
                                    <h3 className='text-center'> Change Password</h3>

                                    <div className="form-group my-1 ">
                                        <Label className='form-label' htmlFor='email' text='Email' />
                                        <Field type="email" className='form-control' name="email" />
                                        <ErrorMessage name='email' component={InputError} />
                                    </div>

                                    <div className="form-group my-1">
                                        <Label className='form-label' htmlFor='password' text='New Password' />
                                        <Field type="password" className='form-control' name="password" />
                                        <ErrorMessage name='password' component={InputError} />
                                    </div>

                                    <div className="form-group my-1">
                                        <Label className='form-label' htmlFor='confirm_password' text='Confirm Password' />
                                        <Field type="password" className='form-control' name="confirm_password" />
                                        <ErrorMessage name='confirm_password' component={InputError} />
                                    </div>

                                    <div className="form-group text-center">
                                        <Button
                                            type='submit'
                                            text='Submit'
                                            className={'btn btn-primary'}
                                        />
                                    </div>
                                </Form>
                            }
                        }
                    </Formik>
                </div>
            </div>

        </div>
    )
}

export default ChangePassword