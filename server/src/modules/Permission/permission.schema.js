const { string, number, object, array } = require("yup");

const createPermissionSchema = object().shape({
    permissionName: string()
        .min(3, "Permission must be at least three charecters long.")
        .max(30, "Permission must be at most 30 charecters long.")
        .required("Permission must be required"),

    services: array()
        .min(1, "Services must not be an empty array")
        .of(number().typeError("Service ID must be a number"))
        .required("Services must be required"),
});

const updatePermissionSchema = object().shape({
    permissionName: string()
        .min(3, "Permission must be at least three charecters long.")
        .max(30, "Permission must be at most 30 charecters long.")
        .required("Permission must be required"),

    services: array()
        .min(1, "Services must not be an empty array")
        .of(number().typeError("Service ID must be a number"))
        .required("Services must be required"),
});

module.exports.createPermissionSchema = createPermissionSchema;
module.exports.updatePermissionSchema = updatePermissionSchema;
