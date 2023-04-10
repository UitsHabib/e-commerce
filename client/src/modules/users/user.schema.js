import { object, string, ref } from "yup";

export const changePasswordValidationSchema = object({
    email: string().email("Invalid email").required("Email is Required"),
    password: string().required("Password is Required"),
    confirm_password: string()
        .required("Confirm Password is Required")
        .oneOf([ref("password"), null], "Password & Confirm Password must be matched"),
});
export const forgetPasswordValidationSchema = object({
    email: string().email("This field must be valid email").required("Email is Required"),
});
