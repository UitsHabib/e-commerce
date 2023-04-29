const path = require("path");
const { AuthStrategy } = require("./user-authentication.middleware");
const {
    registerUser,
    login,
    getSignedInUserProfile,
    getUsers,
    updateUser,
    deleteUser,
    updatePassword,
    logout,
    requestResetPassword,
    handleResetPasswordRequest,
    handleRefreshTokenRequest,
} = require("./user.controller");
const {
    registerUserSchema,
    loginSchema,
    updateUserSchema,
    updatePasswordSchema,
    resetPasswordSchema,
} = require("./user.schema");
const { validate } = require(path.join(
    process.cwd(),
    "/src/modules/core/middlewares/validate"
));

module.exports = function userRoutes(app) {
    app.route("/register").post(validate(registerUserSchema), registerUser);

    app.route("/login").post(validate(loginSchema), login);

    app.route("/me").get(AuthStrategy, getSignedInUserProfile);

    app.route("/update-user").patch(
        AuthStrategy,
        validate(updateUserSchema),
        updateUser
    );

    app.route("/update-password").patch(
        AuthStrategy,
        validate(updatePasswordSchema),
        updatePassword
    );

    app.route("/logout").post(AuthStrategy, logout);

    app.route("/reset-password").post(requestResetPassword);

    app.route("/reset-password/:token").post(
        validate(resetPasswordSchema),
        handleResetPasswordRequest
    );

    // Create a route to handle the refresh token request
    app.route("/refresh-token").post(handleRefreshTokenRequest);

    app.route("/users").get(getUsers);

    app.route("/users/:email").delete(deleteUser);
};
