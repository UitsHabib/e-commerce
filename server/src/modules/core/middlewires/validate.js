function validate(schema) {
  function check(req, res, next) {
    schema
      .validate(req.body, { abortEarly: false })
      .then(function () {
        next();
      })
      .catch(function (err) {
        return res.status(400).send(err.errors[0]);
      });
  }
  return check;
}

module.exports = validate;
