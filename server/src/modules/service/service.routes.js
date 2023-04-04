const AuthStrategy = require("../user/user-authentication.middleware");
const { getServices, getServiceByID } = require("./service.controller");

module.exports = (app) => {
    app.route("/services").get(AuthStrategy, getServices);

    app.get("/services/:id", AuthStrategy, getServiceByID);
};
