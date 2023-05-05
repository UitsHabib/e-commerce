const { string, object, ref } = require("yup");

const categorySchema = object().shape({
    // name: string().min(2).max(30).required(),
    // description: string().min(2).max(200).required(),
    name: string()
        .min(2, "Category name must be at least two charecters long.")
        .max(30, "Category name must be at most 30 charecters long.")
        .required("Category name must be required"),
    description: string()
        .min(2, "Description must be at least two charecters long.")
        .max(100, "Description must be at most 30 charecters long.")
        .required("Description must be required"),
});

module.exports.categorySchema = categorySchema;
