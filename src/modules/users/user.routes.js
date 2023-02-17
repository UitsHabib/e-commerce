
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('./user.controller');

module.exports = ( app ) => {
    app.route('/users')
        .get(getUsers)
        .post( createUser );
    
    app.route('/user/:email')
        .get( getUser )
        .patch( updateUser )
        .delete( deleteUser );
}