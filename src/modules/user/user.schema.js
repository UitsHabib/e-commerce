const yup = require("yup");

// Create User Schema Model
const registerUserSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(2, "Must be at least two characters.")
        .max(50, "Maximum 30 characters")
        .required("First Name is required"),
    lastName: yup
        .string()
        .min(2, "Must be at least two characters.")
        .max(50, "Maximum 30 characters")
        .required("Last Name is required"),
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: yup
        .string()
        .min(8, "Must be at least 8 characters")
        .max(50, "Maximum 50 characters")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .required("Confirm password is required")
        .oneOf(
            [yup.ref("password"), null],
            "Password and Confirm password must be matched"
        ),
});

// Login schema model
const loginSchema = yup.object().shape({
    email: yup
        .string()
        .email("This field should be a valid email address")
        .max(100, "Email must be at most 100 characters long")
        .required("Email field is required"),
    password: yup
        .string()
        .max(50, "Password should be at most 50 characters long")
        .required("Password field is required"),
});

// Update user schema model ( Only firstname & lastname )
const updateUserSchema = yup.object().shape({
    firstName: yup
        .string()
        .min(2, "Must be at least two characters.")
        .max(50, "Maximum 30 characters")
        .required("First Name is required"),
    lastName: yup
        .string()
        .min(2, "Must be at least two characters.")
        .max(50, "Maximum 30 characters")
        .required("Last Name is required"),
});

// Update Password schema
const updatePasswordSchema = yup.object().shape({
    password: yup
        .string()
        .max(50, "Old Password must be less than 50 chars")
        .required("Old Password Required"),
    newPassword: yup
        .string()
        .max(50, "Password should be at most 50 characters long")
        .required("Password field is required"),
    confirmNewPassword: yup
        .string()
        .required("Confirm new password is required")
        .oneOf(
            [yup.ref("newPassword"), null],
            "New Password and Confirm new password must be matched"
        ),
});

// Reset Password schema
const resetPasswordSchema = yup.object().shape({
    newPassword: yup
        .string()
        .max(50, "Password should be at most 50 characters long")
        .required("Password field is required"),
    confirmNewPassword: yup
        .string()
        .required("Confirm new password is required")
        .oneOf(
            [yup.ref("newPassword"), null],
            "New Password and Confirm new password must be matched"
        ),
});

module.exports.registerUserSchema = registerUserSchema;
module.exports.loginSchema = loginSchema;
module.exports.updateUserSchema = updateUserSchema;
module.exports.updatePasswordSchema = updatePasswordSchema;
module.exports.resetPasswordSchema = resetPasswordSchema;
