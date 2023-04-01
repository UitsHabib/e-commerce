const sequelize = require("../../config/lib/sequelize");
const { DataTypes, STRING } = require("sequelize");

const Permission = sequelize.define(
    "permissions",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        permissionName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        services: {
            allowNull: true,
            type: DataTypes.JSON,
        },
        created_by: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        updated_by: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "permissions",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Permission;
