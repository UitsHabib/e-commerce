const path = require("path");
const { DataTypes } = require("sequelize");
const { sequelize } = require(path.join(
    process.cwd(),
    "/src/config/lib/sequelize"
));
const bcrypt = require("bcrypt");

const User = sequelize.define(
    "users",
    {
        id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        firstName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        lastName: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
            set(value) {
                this.setDataValue("email", value.toLowerCase());
            },
        },
        password: {
            allowNull: false,
            type: DataTypes.STRING,
            set(value) {
                this.setDataValue("password", bcrypt.hashSync(value, 8));
            },
        },
        profile: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        created_by: {
            allowNull: true,
            type: DataTypes.UUID,
        },
        updated_by: {
            allowNull: true,
            type: DataTypes.UUID,
        },
        resetToken: { type: DataTypes.STRING, allowNull: true },
        resetTokenExpiry: { type: DataTypes.DATE, allowNull: true },
    },
    {
        tableName: "users",
        timeStamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
    }
);

User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Adding a new method to the User model to generate a reset token
User.prototype.generateResetToken = function () {
    const token = bcrypt.hashSync(
        process.env.TOKEN_SECRET,
        Math.floor(Math.random() * (10 - 7) + 7)
    );
    const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // Token Expires in 24 hours
    this.resetToken = token;
    this.resetTokenExpiry = tokenExpiry;
    return token;
};

// Check resetToken Expiration & Validation
User.prototype.isResetTokenValid = function (resetTokenExpiry) {
    if (!resetTokenExpiry) return false; // reset token expiry field is not set

    return resetTokenExpiry.getTime() > Date.now(); // check if reset token expiry time has passed
};

// Add a new model for storing refresh tokens
const RefreshToken = sequelize.define("RefreshToken", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports.User = User;
module.exports.RefreshToken = RefreshToken;
