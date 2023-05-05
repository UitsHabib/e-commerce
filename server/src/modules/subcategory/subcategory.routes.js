const { subcategoryImage } = require("../../config/lib/multer");
const validate = require( "../core/middlewires/validate" );
const AuthStrategy = require("../user/user-authentication.middleware");
const { getSubcategories, createSubcategory, getSubcategroyByID, updateSubcategory, deleteSubcategory } = require("./subcategory.controller");
const { subcategorySchema } = require("./subcategory.schema");

module.exports = (app) => {
    app.route("/subcategories")
        .get(getSubcategories)
        .post(AuthStrategy, subcategoryImage.single('image'), createSubcategory);

    app.route("/subcategories/:id")
        .get(getSubcategroyByID)
        .patch(AuthStrategy, validate(subcategorySchema), updateSubcategory)
        .delete(AuthStrategy, deleteSubcategory);
};
