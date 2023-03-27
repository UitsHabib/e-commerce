const { getServices } = require( "./service.controller" );
// const { createUserSchema, userLoginSchema, updateUserSchema } = require( "./user.schema");
// const AuthStrategy = require( "./user-authentication.middleware" );

module.exports = (app) => {
    app.route('/services')
        .get(getServices);
        // .post(validate(createUserSchema), createUser)
        // .patch(AuthStrategy, validate(updateUserSchema), updateUser);
    
    // app.get('/users/:id', getUserByID);

}