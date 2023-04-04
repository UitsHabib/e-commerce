const sequelize = require("../../config/lib/sequelize");
const { DataTypes, STRING } = require("sequelize");
const Permission = require("./permission.model");
const Service = require("../service/service.model");

const ServicePermission = sequelize.define(
    "service-permissions",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        service_id: {
            type: DataTypes.UUID,
        },
        permission_id: {
            type: DataTypes.UUID,
        },
    },
    {
        tableName: "service-permissions",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

Permission.hasMany(ServicePermission, {
    as: "permissionServices",
    foreignKey: "permission_id",
});

// ServicePermission.belongsTo(Permission, {
//     as: "permission",
//     foreignKey: "permission_id",
// });
// Permission.belongsToMany(Service, {
//     through: ServicePermission,
//     as: "services",
//     foreignKey: "permission_id",
// });

// Service.hasMany(ServicePermission, {
//     as: "servicePermissions",
//     foreignKey: "service_id",
// });

ServicePermission.belongsTo(Service, {
    as: "service",
    foreignKey: "service_id",
});

module.exports = ServicePermission;
