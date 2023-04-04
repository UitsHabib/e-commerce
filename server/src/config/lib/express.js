const path = require("path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("../index");

module.exports = function () {
    const app = express();
    app.use(express.json());
    app.use(cookieParser("hi there"));

    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            return callback(null, true);

            callback(new Error("Not allowed by CORS"));
        },
    };
    app.use(cors(corsOptions));

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
