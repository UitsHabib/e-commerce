const AuthStrategy = require("../user/user-authentication.middleware");
const { getServices, getServiceByID, createService, updateService, deleteService } = require("./service.controller");
const validate = require('../core/middlewires/validate');
const { serviceSchema } = require( "./service.schema" );


module.exports = (app) => {
    app.route("/services")
        .get(AuthStrategy, getServices)
        .post(AuthStrategy, validate(serviceSchema), createService);

    app.route("/services/:id")
        .get(AuthStrategy, getServiceByID)
        .patch(AuthStrategy, validate(serviceSchema), updateService)
        .delete(AuthStrategy, deleteService);
};
