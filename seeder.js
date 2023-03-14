const path = require("path");

function init() {
    const config = require("./src/config");
    config.initEnvironmentVariables();

    const sequelize = require("./src/config/lib/sequelize");

    sequelize
        .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
        .then(() => {
            require("./src/modules/user/user.model");
            sequelize
                .sync()
                .then(() => {
                    console.log("DB seed completed");
                })
                .catch((err) => {
                    console.log(err);
                });
        })
        .catch((err) => {
            console.log(err);
        });
}

init();
