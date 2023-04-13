const { string, number, object, array } = require("yup");

const createPermissionSchema = object().shape({
    name: string()
        .min(3, "Permission must be at least three charecters long.")
        .max(30, "Permission must be at most 30 charecters long.")
        .required("Permission must be required"),

    description: string()
        .min(10, "Description must be at least 10 charecters long.")
        .max(150, "Description must be at most 30 charecters long.")
        .required(" Description must be required"),
});

const updatePermissionSchema = object().shape({
    name: string()
        .min(3, "Permission must be at least three charecters long.")
        .max(30, "Permission must be at most 30 charecters long.")
        .required("Permission must be required"),

    description: string()
        .min(10, "Description must be at least 10 charecters long.")
        .max(150, "Description must be at most 30 charecters long.")
        .required(" Description must be required"),
});

module.exports.createPermissionSchema = createPermissionSchema;
module.exports.updatePermissionSchema = updatePermissionSchema;
