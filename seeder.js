const path = require('path')
const async = require('async')

async function init(){
    const config = require(path.join(process.cwd(),('/src/config/config')))
    await config.initEnvironmentVariables()

    const sequelize = require(path.join(process.cwd(),('/src/config/lib/sequelize')))

    await sequelize.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)

     require(path.join(process.cwd(),('/src/modules/user/user.model')))

     await sequelize.sync()
}

init()
