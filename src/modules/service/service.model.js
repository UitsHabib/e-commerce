const sequelize = require('../../config/lib/sequelize');
const { DataTypes, UUID } = require('sequelize');

const Service = sequelize.define(
    'services',
    {
        id: {
            allowNull: false,
            primaryKey:true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        name:{
            allowNull: true,
            type: DataTypes.STRING
        },
        description: {
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
        tableName: 'services',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
);

module.exports = Service;