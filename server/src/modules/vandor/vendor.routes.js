const { createVendor, getVendors, getVendorById, deleteVendor, updateVendor } = require("./vendor.controller");
const validate = require("../core/middlewires/validate");
const { createVendorSchema, updateVendorSchema } = require("./vendor.schema");
const AuthStrategy = require("../user/user-authentication.middleware");

module.exports = (app) => {
    app.route("/vendors")
        .post(AuthStrategy, validate(createVendorSchema), createVendor)
        .get(AuthStrategy, getVendors);
    
    app.route("/vendors/:id")
        .get(getVendorById)
        .patch(AuthStrategy, validate(updateVendorSchema), updateVendor)
        .delete(AuthStrategy, deleteVendor);
}