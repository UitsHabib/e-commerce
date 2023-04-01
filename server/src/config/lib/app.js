module.exports.start = function () {
  const app = require("./express")();
  app.listen(app.get("port"), function () {
    console.log("Running on port 3000!");
  });
};
