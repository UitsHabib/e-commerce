module.exports.bootStrap = function () {
    const app = require("./express")();
    const port = process.env.PORT;

    app.listen(port, function () {
        console.log(`server running in http://localhost:${port}`);
    });
};
