function validation  (schema){
    return function (req, res,next){
        schema.validate(req.body)
            .then((value) => {
            next();
            })
            .catch((err) => {
                // console.log(err)
                return res.status(400).send(err.errors[0])
            })
    }
}

module.exports = validation
