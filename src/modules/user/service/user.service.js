const jwt = require("jsonwebtoken");

const tokenGenerator = function (data) {
    return jwt.sign(
        { id: data.id, email: data.email },
        process.env.TOKEN_SECRET,
        {
            expiresIn: "8h",
            issuer: data.email,
        }
    );
};

const refreshTokenGenerator = function (data) {
    return jwt.sign({ id: data.id }, process.env.TOKEN_SECRET, {
        issuer: data.email,
    });
};

module.exports.tokenGenerator = tokenGenerator;
module.exports.refreshTokenGenerator = refreshTokenGenerator;
