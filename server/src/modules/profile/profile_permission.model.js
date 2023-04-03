const sequelize = require("../../config/lib/sequelize");
const { DataTypes, STRING } = require("sequelize");

const Profile = sequelize.define(
    "profile_permisions",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        profile_id: {
            allowNull: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        permission_id: {
            allowNull: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        created_by: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        updated_by: {
            allowNull: false,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
    },
    {
        tableName: "profile_permisions",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = Profile;
