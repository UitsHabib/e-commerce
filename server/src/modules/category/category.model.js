const sequelize = require('../../config/lib/sequelize');
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

module.exports = Category;