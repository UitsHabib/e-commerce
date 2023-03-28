const validation = require("../core/middlewares/validate")
const { AuthStrategy } = require("./user-authentication.middleware")
const { login, addUser, getSignedInUserProfile, updateProfile, changePassword, logout, generateRefreshToken } = require("./user.controller")
const { loginSchema, registerSchema, updateSchema, updatePasswordSchema } = require("./user.schema")

module.exports = function(app){
    app.route('/login')
        .post(validation(loginSchema), login)

    app.route('/register')
        .post(validation(registerSchema), addUser)

    app.route('/me')
        .get(AuthStrategy, getSignedInUserProfile)

    app.route('/profile-update')
        .put(AuthStrategy, validation(updateSchema), updateProfile)

    app.route('/update/password')
        .patch(AuthStrategy, validation(updatePasswordSchema), changePassword)

    app.route('/logout')
        .post(AuthStrategy, logout)

    app.route('/token')
        .post(AuthStrategy, generateRefreshToken)


}
