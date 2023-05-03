const sequelize = require('../../config/lib/sequelize');
const { DataTypes, UUID } = require('sequelize');
const Subcategory = require('../../modules/subcategory/subcategory.model')
const Color = require('../../modules/color/color.model');
const Size = require('../../modules/size/size.model');
const Brand = require('../brand/brand.model');

const Product = sequelize.define(
    'products',
    {
        id: {
            allowNull: false,
            primaryKey:true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        sub_cat_id:{
            type: DataTypes.UUID
        },
        product_code:{
            allowNull: false,
            type: DataTypes.STRING
        },
        name:{
            allowNull: false,
            type: DataTypes.STRING
        },
        description: {
            allowNull: true,
            type: DataTypes.STRING
        },
        image: {
            allowNull: true,
            type: DataTypes.STRING
        },
        brand_id: {
            type: DataTypes.UUID
        },
        color_id: {
            type: DataTypes.UUID
        },
        size_id: {
            type: DataTypes.UUID
        },
        created_by: {
            allowNull: true,
            type: DataTypes.UUID
        },
        updated_by: {
            allowNull: true,
            type: DataTypes.UUID
        }
    },
    {
        tableName: 'products',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Subcategory.hasMany(Product, {
    as: "products",
    foreignKey: "sub_cat_id"
});

Brand.hasMany(Product, {
    as: "products",
    foreignKey: "brand_id"
});

Color.hasMany(Product, {
    as: "products",
    foreignKey: "color_id"
});

Size.hasMany(Product, {
    as: "products",
    foreignKey: "size_id"
});


module.exports = Product;