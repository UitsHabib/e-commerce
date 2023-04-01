const { createPermission, getPermission } = require("./permission.controllers");
const validate = require("../core/middlewires/validate");
const { createPermissionSchema } = require("./permission.schema");
const AuthStrategy = require("../user/user-authentication.middleware");

module.exports = (app) => {
    app.route("/permission")
        .post(validate(createPermissionSchema), createPermission)
        .get(getPermission);
};
