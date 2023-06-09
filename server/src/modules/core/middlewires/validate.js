module.exports = function validates(schema) {
    return function check(req, res, next) { 
        console.log(req.body); 
        schema.validate(req.body, {abortEarly: false})
            .then(() => {
                next();
            })
            .catch(function(err){
                return res.status(400).send(err.errors[0]);
            });
    }
}