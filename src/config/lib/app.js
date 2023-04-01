module.exports.start = () => {
    const app = require("./express")();
    app.listen(app.get("port"), () => {
        console.log("running on port 3000");
    });
};
