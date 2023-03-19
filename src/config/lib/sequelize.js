const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: "mysql",
    logging:true,
    sync:true
  });

module.exports.sequelize = sequelize
