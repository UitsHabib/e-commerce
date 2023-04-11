const { object, string } = require( "yup" );

const serviceSchema = object().shape({
    name: string().required().min(2).max(100),
    description: string().max(250)
})

module.exports.serviceSchema = serviceSchema;