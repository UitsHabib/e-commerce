const {
    createPermission,
    getPermissions,
    getPermission,
    updatePermission,
    deletePermission,
} = require("./permission.controllers");
const validate = require("../core/middlewires/validate");
const {
    createPermissionSchema,
    updatePermissionSchema,
} = require("./permission.schema");
const AuthStrategy = require("../user/user-authentication.middleware");

module.exports = (app) => {
    app.route("/permission")
        .post(AuthStrategy, validate(createPermissionSchema), createPermission)
        .get(AuthStrategy, getPermissions);

    app.route("/permission/:id")
        .get(AuthStrategy, getPermission)
        .patch(AuthStrategy, validate(updatePermissionSchema), updatePermission)
        .delete(AuthStrategy, deletePermission);
};
