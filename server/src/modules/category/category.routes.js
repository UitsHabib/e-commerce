const { categoryImage } = require( "../../config/lib/multer" );
const validate = require( "../core/middlewires/validate" );
const AuthStrategy = require("../user/user-authentication.middleware");
const { getCategories, createCategory, getCategroyByID, updateCategory, deleteCategory } = require("./category.controller");
const { categorySchema } = require("./category.schema");

module.exports = (app) => {
    app.route("/categories")
        .get(getCategories)
        .post(AuthStrategy, validate(categorySchema), categoryImage.single('image'), createCategory);

    app.route("/categories/:id")
        .get(getCategroyByID)
        .patch(AuthStrategy, validate(categorySchema), updateCategory)
        .delete(AuthStrategy, deleteCategory);
};
