
const { getUsers, getUser, createUser, updateUser, deleteUser, login } = require('./user.controller');
const validate = require('../core/middlewares/validate');
const { createUserSchema, userUpdateSchema } = require('./user.schema');
const authenticate = require('../core/middlewares/authenticate');

module.exports = ( app ) => {
    app.route('/users')
        .get(getUsers)
        .post(validate(createUserSchema), createUser)
        .patch(authenticate, validate(userUpdateSchema), updateUser);
    
    app.route('/users/:email')
        .get(getUser)
        .delete(authenticate, deleteUser);

    app.post('/users/login', login);
}

/*
    feature/mamun-login
    
*/