import { object, string, ref } from "yup";

export const signInSchema = object({
    email: string().email().required("This field must not be empty."),
    password: string()
        .min(8, "This field must be at least 8 characters long.")
        .max(50, "This field must be at most 50 characters long.")
        .required("This  field must not be empty."),
});

export const signUpSchema = object({
    firstName: string()
        .min(2, "This field must be at least 2 characters long.")
        .max(30, "This field cannot be longer than 30 characters.")
        .required("This  field must not be empty."),
    lastName: string()
        .min(2, "This field must be at least 2 characters long.")
        .max(30, "This field cannot be longer than 30 characters.")
        .required("This  field must not be empty."),
    email: string().email().required("This field must not be empty."),
    password: string()
        .min(8, "This field must be at least 8 characters long.")
        .max(50, "This field cannot be longer than 50 characters.")
        .required("This  field must not be empty."),
    confirmPassword: string()
        .oneOf([ref("password"), null], "Password must match.")
        .required("This  field must not be empty."),
});

export const forgetPasswordSchema = object({
    email: string().email().required("This field must not be empty."),
});
