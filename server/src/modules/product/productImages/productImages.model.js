// const sequelize = require('../../config/lib/sequelize');
const sequelize = require("../../../config/lib/sequelize")
const { DataTypes, UUID } = require('sequelize');
const Product = require('../product.model');

const ProductImage = sequelize.define(
    'productImages',
    {
        id: {
            allowNull: false,
            primaryKey:true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        product_id:{
            type: DataTypes.UUID
        },
        image: {
            allowNull: true,
            type: DataTypes.STRING
        },
    },
    {
        tableName: 'productImages',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Product.hasMany(ProductImage, {
    as: "productImages",
    foreignKey: "product_id"
});

module.exports = ProductImage;