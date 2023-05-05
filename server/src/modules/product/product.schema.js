// const yup = require('yup');
const { string, object, array, number, boolean } = require("yup");

const createProductSchema = object().shape({
    product_code: string().required(),
    name: string().required(),
    description: string().required(),
    price: number().required(),
    discount: number().notRequired(),
    status: boolean().required(),
  
});

module.exports = createProductSchema;

