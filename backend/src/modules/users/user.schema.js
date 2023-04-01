const { object, string, ref } = require('yup');

const createUserSchema = object().shape({
    firstName: string()
        .min(2,'Name must be minimum 2 characters long')
        .max(20,'Name must be maximum 20 characters long')
        .required('Name field is required!'),
    lastName: string()
        .min(2,'Name must be minimum 2 characters long')
        .max(20,'Name must be maximum 20 characters long')
        .required('Name field is required!'),
    email:string()
        .email('This field should be a valid email address')
        .required('Email field is required'),
    password: string()
        .min(8, 'The password must be at least 8 characters long.')
        .max(50, 'The password must be at most 50 characters long.')
        .required('Password is required'),
    confirmPassword: string()
        .required('Confirm password is required')
        .oneOf([ref('password'), null], 'Password and confirm password must be matched')
});

const userUpdateSchema = object().shape({
    firstName: string()
        .min(2,'Name must be minimum 2 characters long')
        .max(20,'Name must be maximum 20 characters long')
        .required('Name field is required!'),
    lastName: string()
        .min(2,'Name must be minimum 2 characters long')
        .max(20,'Name must be maximum 20 characters long')
        .required('Name field is required!')
});

module.exports.createUserSchema = createUserSchema;
module.exports.userUpdateSchema = userUpdateSchema;