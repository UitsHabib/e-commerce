const path = require("path");
const {DataTypes} = require('sequelize')
const sequelize = require(path.join(process.cwd(),'src/config/lib/sequelize'))

const Admin = sequelize.define('users',{

    id:{
        allowNull: false,
        primayKey: true,
        type: DataTypes.UUID,
        default: DataTypes.UUIDV4
    },
    first_name:{
        allowNull: true,
        type: DataTypes.STRING(255)
    },
    last_name:{
        allowNull:true,
        type: DataTypes.STRING(255)
    },
    image:{
        allowNull:true,
        type: DataTypes.STRING
    },
    email:{
        allowNull:false,
        type:DataTypes.STRING(255),
        validate:{
            isEmail: true
        },
        set(value){
            this.setDataValue('email',value.toLowerCase())
        }
    },
    password:{
        allowNull:false,
        type: DataTypes.STRING(255),
        set(value){
            this.setDataValue('password',bcrypt.hashSync(value,8))
        }
    }
},{
    tableName: 'admins',
    timeStamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})


module.exports = Admin
