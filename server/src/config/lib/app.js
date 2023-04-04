module.exports.start = function () {
    const app = require("./express")();

    app.listen(app.get("port"), () => {
        console.log("Server is running on port: ", app.get("port"));
    });
};
