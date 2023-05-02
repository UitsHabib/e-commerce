const sequelize = require('../../config/lib/sequelize');
const Subcategory = require( '../subcategory/subcategory.model' );
const { DataTypes, UUID } = require('sequelize');

const Category = sequelize.define(
    'categories',
    {
        id: {
            allowNull: false,
            primaryKey:true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
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
        tableName: 'categories',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

// Category.hasMany(Subcategory, {
//   foreignKey: "category_id",
//   as: "subcategories",
// });

module.exports = Category;