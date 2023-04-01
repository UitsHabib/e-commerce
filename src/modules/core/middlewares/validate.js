// Schema Validation
function validate(schema){
    return (req, res, next) => {
        schema.validate(req.body, {abortEarly: false})
            .then( () => {
                next();
            })
            .catch(err => {
                return res.status(400).send(err);
            })
    };
}

module.exports.validate = validate;