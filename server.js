(function () {
    const path = require("path");
    const config = require(path.join(process.cwd(), "/src/config/index"));
    const app = require(path.join(process.cwd(), "/src/config/lib/app"));

    config.initEnvironmentVariables();
    app.start();
})();
