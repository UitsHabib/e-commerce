const sequelize = require("../../config/lib/sequelize");
const { DataTypes, STRING } = require("sequelize");

const Permission_service = sequelize.define(
    "permission_service",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        permission_id: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        service_id: {
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
        tableName: "permission_service",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Permission_service;
