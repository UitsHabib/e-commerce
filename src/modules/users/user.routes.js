
const { getUsers } = require('./user.controller');

module.exports = ( app ) => {
    app.route('/users')
        .get(getUsers);
}