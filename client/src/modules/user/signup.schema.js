import * as Yup from "yup";

export const customerSignUpSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(2, "first must be at least 2 characters")
        .required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    agree: Yup.boolean().oneOf([true], "Must agree to terms and conditions"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
});

export const shopSignUpSchema = Yup.object().shape({
    shopName: Yup.string()
        .min(2, "Password must be at least 2 characters")
        .required("Shop Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    phoneNumber: Yup.string()
        .min(11, "Invalid Phone Number")
        .required("Phone Number is required"),
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
});
