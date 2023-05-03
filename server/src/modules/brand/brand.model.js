const sequelize = require('../../config/lib/sequelize');
const { DataTypes, UUID, INTEGER } = require('sequelize');

const Brand = sequelize.define(
    'brands',
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
        status: {
            allowNull: true,
            type: DataTypes.INTEGER
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
        tableName: 'brands',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = Brand;