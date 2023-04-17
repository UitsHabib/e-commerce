import { object, string, ref } from "yup";

export const validationSchema = object({
    name: string().required("Name is Required"),
    description: string().required("Description is Required"),
});
