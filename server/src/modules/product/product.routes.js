const {
    createProduct,
    getAllProducts
} = require("./product.controller");

const productImages = require('../../config/lib/multer')

// const AuthStrategy = require("../user/user-authentication.middleware");

module.exports = (app) => {
    app.route("/product")
        .post(productImages,createProduct)
        .get(getAllProducts);
};
