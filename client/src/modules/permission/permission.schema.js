import * as Yup from "yup";
export const permissionCreateSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Permission name must be at least 4 characters")
        .max(20, "Permission name must not be over 20 characters")
        .required("Permission name is required"),
    description: Yup.string()
        .min(10, "Description must be at least 10 characters")
        .max(150, "Description must not be over 150 characters")
        .required("Description name is required"),
});
