const {
    createUser,
    getUsers,
    deleteUser,
    updateUser,
    getUser,
    login,
} = require("./user.controllers");
const validate = require("../core/middlewires/validate");
const { createUserSchema, updateUserSchema } = require("./user.schema");
const AuthStrategy = require("./user-authentication.middleware");

module.exports = (app) => {
    app.route("/users")
        .post(validate(createUserSchema), createUser)
        .get(getUsers)
        .patch(AuthStrategy, validate(updateUserSchema), updateUser);

    app.route("/users/:id").get(getUser).delete(deleteUser);
    app.route("/users/login").post(login);
};
