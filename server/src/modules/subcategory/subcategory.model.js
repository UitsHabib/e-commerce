const sequelize = require('../../config/lib/sequelize');
const Category = require( '../category/category.model' );
const { DataTypes, UUID } = require('sequelize');

const Subcategory = sequelize.define(
    'subcategories',
    {
        id: {
            allowNull: false,
            primaryKey:true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        category_id: {
            allowNull: false,
            type: DataTypes.UUID
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
        tableName: 'subcategories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

Category.hasMany(Subcategory, {
    as: "subcategories",
    foreignKey: "category_id"
});

module.exports = Subcategory;