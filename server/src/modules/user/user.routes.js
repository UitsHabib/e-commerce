const {
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    getUser,
    login,
    logout,
} = require("./user.controller");
const validate = require("../core/middlewires/validate");
const { createUserSchema, updateUserSchema } = require("./user.schema");
const AuthStrategy = require("./user-authentication.middleware");

module.exports = (app) => {
    app.route("/users")
        .post(validate(createUserSchema), createUser)
        .get(AuthStrategy, getUsers)
        .patch(AuthStrategy, validate(updateUserSchema), updateUser);
    app.route("/users/logout").post(AuthStrategy, logout);

    app.route("/users/:id").get(getUser).delete(AuthStrategy, deleteUser);
    app.route("/users/login").post(login);
};
