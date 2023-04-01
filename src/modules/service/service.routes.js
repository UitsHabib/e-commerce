const path = require("path");
const { AuthStrategy } = require("../user/user-authentication.middleware");
const { getServices, getService } = require("./service.controller");

function serviceRoutes(app) {
    app.route("/services").get(AuthStrategy, getServices);

    app.route("/services/:id").get(AuthStrategy, getService);
}

module.exports = serviceRoutes;
