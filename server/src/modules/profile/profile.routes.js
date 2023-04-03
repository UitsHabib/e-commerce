const {
    createProfile,
    getProfiles,
    getProfile,
    updateProfile,
    deleteProfile,
} = require("./profile.controller");
const validate = require("../core/middlewires/validate");
const {
    createProfileSchema,
    updateProfileSchema,
} = require("./profile.schema");
const AuthStrategy = require("../user/user-authentication.middleware");

module.exports = (app) => {
    app.route("/profiles")
        .post(AuthStrategy, validate(createProfileSchema), createProfile)
        .get(AuthStrategy, getProfiles);

    app.route("/profile/:id")
        .patch(AuthStrategy, validate(updateProfileSchema), updateProfile)
        .delete(AuthStrategy, deleteProfile)
        .get(AuthStrategy, getProfile);
};
