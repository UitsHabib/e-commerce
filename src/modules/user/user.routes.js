const { dashboard, createUser, login, updateUser, getUsers, getUserByID } = require("./user.controller");
const { createUserSchema, userLoginSchema, updateUserSchema } = require("./user.schema");
const validate = require( "../core/middlewares/validate" );
const AuthStrategy = require("./user-authentication.middleware");

module.exports = (app) => {
    app.get('/', dashboard);

    app.route('/users')
        .get(AuthStrategy, getUsers)
        .post(validate(createUserSchema), createUser)
        .patch(AuthStrategy, validate(updateUserSchema), updateUser);
    
    app.get('/users/:id', getUserByID);

    app.route('/users/login')
            .post(validate(userLoginSchema), login);
}