const { string, object, ref } = require("yup");

const categorySchema = object().shape({
  name: string().min(2).max(30).required(),
  description: string().min(2).max(30).required(),
});

module.exports.categorySchema = categorySchema;
