const sequelize = require("../sequelize");
const { DataTypes, STRING } = require("sequelize");

const EmailFormat = sequelize.define(
    "email-format",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        subject: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING,
        },
    },
    {
        tableName: "email-format",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

module.exports = EmailFormat;
