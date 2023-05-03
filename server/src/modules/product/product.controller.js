const Product = require("./product.model")

async function createProduct(req, res) {
    try {
      const {
        sub_cat_id,
        product_code,
        name,
        description,
        brand_id,
        color_id,
        size_id
      } = req.body;
  
      const product = await Product.create({
        sub_cat_id,
        product_code,
        name,
        description,
        images: req.fileName,
        brand_id,
        color_id,
        size_id,
        created_by: req.user.id, // assuming you have a user id available in the request
        updated_by: req.user.id
      });
    //   console.log("fileName-----------",req.fileName);
  
      return res.status(201).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to create product.' });
    }
  }

  async function getAllProducts(req, res) {
    try {
      const products = await Product.findAll();
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Failed to get products.' });
    }
  }

  module.exports.createProduct = createProduct;
  module.exports.getAllProducts = getAllProducts;