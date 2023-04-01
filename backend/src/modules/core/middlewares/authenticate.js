const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    let token = null;

    if(req && req.signedCookies) {
        token = req.headers.authorization.split(" ")[1];

        if(!token) return res.status(401).send("Authentication Failed");
    }

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if(err) {
            console.log(err);
            return res.status(401).send("Invalid Token");
        }

        req.user = decoded;
        next();
    });
}

module.exports = authenticate;