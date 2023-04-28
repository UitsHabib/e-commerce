const { string, object, ref } = require("yup");

const subcategorySchema = object().shape({
  name: string().min(2).max(50).required(),
  description: string().min(2).max(200).required(),
  category_id: string().required(),
});

module.exports.subcategorySchema = subcategorySchema;
