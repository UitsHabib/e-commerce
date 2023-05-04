const {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct} = require("./product.controller");

const {uploadProductImages} = require('../../config/lib/multer')


const AuthStrategy = require("../user/user-authentication.middleware");

module.exports = (app) => {
    app.route("/product")
        .post(AuthStrategy,uploadProductImages.array('images',3), createProduct)
        .get( AuthStrategy,getAllProducts);

    app.route("/product/:id")
        .get(AuthStrategy, getProduct)
        .patch(AuthStrategy, updateProduct)
        .delete(AuthStrategy, deleteProduct)
};
