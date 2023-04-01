const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { findUser } = require("./user.controllers");

module.exports = function () {
    function cookieExtractor(req) {
        let token = null;
        if (req && req.signedCookies) {
            console.log(req.headers);
            token = req.headers.authorization.split(" ")[1];
        }
        console.log("token:", token);
        return token;
    }

    passport.use(
        "user-jwt",
        new Strategy(
            {
                secretOrKey: process.env.TOKEN_SECRET,
                jwtFromRequest: cookieExtractor,
            },
            function (payload, done) {
                console.log("strategy: ", payload);

                const user = findUser(payload.email);
                if (!user) return done(null, false);
                done(null, user);
            }
        )
    );
};
