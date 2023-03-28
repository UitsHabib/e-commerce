const { object, string, ref } = require("yup");

const loginSchema = object().shape({
    email: string()
        .email("This field should be a valid email address")
        .max(100, "Email must be at most 100 characters long")
        .required("Email field is required"),
    password: string()
        .max(50, "Password should be at most 50 characters long")
        .required("Password field is required"),
});

const registerSchema = object().shape({
    first_name: string()
        .max(100, "First name must be at most 100 characters long")
        .min(8, "First name must be at lest 8 character long")
        .required("First name is required"),

    last_name: string()
        .max(100, "Last name must be at most 100 characters long")
        .required("Last name is required"),

    email: string()
        .email("This field should be a valid email address")
        .max(100, "Email must be at most 100 characters long")
        .required("Email field is required"),

    password: string()
        .max(50, "Password should be at most 50 characters long")
        .required("Password field is required"),

    confirm_password: string()
        .required("Confirm password is required")
        .oneOf(
            [ref("password"), null],
            "Password and Confirm Password must be matched"
        ),
});

const updateSchema = object().shape({
    first_name: string()
        .max(100, "First name must be at most 100 characters long")
        .min(8, "First name must be at lest 8 character long")
        .required("First name is required"),

    last_name: string()
        .max(100, "Last name must be at most 100 characters long")
        .required("Last name is required"),
});

const updatePasswordSchema = object().shape({
    password: string()
        .max(50, "Old Password should be at most 50 characters long")
        .required("Old Password field is required"),

    new_password: string()
        .max(50, "Password should be at most 50 characters long")
        .required("Password field is required"),

    confirm_password: string()
        .required("Confirm password is required")
        .oneOf(
            [ref("new_password"), null],
            "New Password and Confirm Password must be matched"
        ),
});

module.exports.loginSchema = loginSchema;
module.exports.registerSchema = registerSchema;
module.exports.updateSchema = updateSchema;
module.exports.updatePasswordSchema = updatePasswordSchema;
