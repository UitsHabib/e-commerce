const validation = require("../../core/middlewares/validate")
const { AuthStrategy } = require("./admin-authentication.middleware")
const { login, registerAdmin, getSignedInUserProfile } = require("./admin.controller")
const { loginSchema,registerSchema } = require("./admin.schema")

module.exports = function(app){
    app.route('/admin/login')
        .post(validation(loginSchema),login)
    app.route('/admin/register')
        .post(validation(registerSchema),registerAdmin)
    app.route('/admin/me')
        .get(AuthStrategy,getSignedInUserProfile)


}
