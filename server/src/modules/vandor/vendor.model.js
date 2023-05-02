const sequelize = require("../../config/lib/sequelize");
const { DataTypes, STRING } = require("sequelize");
const bcrypt = require("bcrypt");

const Vendor = sequelize.define(
    "vendors",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        profile_id: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        store_name: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        logo: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        phone: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        district: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        thana: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        address: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        about_seller: {
            allowNull: true,
            type: DataTypes.TEXT,
        },
        username: {
            allowNull: true,
            type: DataTypes.STRING,
            unique: true,
        },
        email: {
            unique: true,
            allowNull: false,
            type: DataTypes.STRING,
            validate: {
                isEmail: true,
            },
            set(value) {
                this.setDataValue("email", value.toLowerCase());
            },
        },
        email_verified_at:{
            allowNull: true,
            type: DataTypes.DATE,
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue("password", bcrypt.hashSync(value, 8));
            },
        },
        status: {
            allowNull: false,
            type: DataTypes.INTEGER,
            defaultValue: false,
            comment: "0 for disabled, 1 for active"
        },
    },
    {
        tableName: "vendors",
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

Vendor.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = Vendor;
