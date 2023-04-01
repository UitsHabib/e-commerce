const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");

const config = require("../index");

module.exports = function () {
    const app = express();
    app.use(express.json());
    app.use(cookieParser(process.env.TOKEN_SECRET));
    app.set("port", process.env["PORT"]);

    const globalConfig = config.getGlobalConfig();

    globalConfig.routes.forEach(function (routePath) {
        require(path.resolve(routePath))(app);
    });

    globalConfig.strategies.forEach(function (strategyPath) {
        require(path.resolve(strategyPath))();
    });

    return app;
};
