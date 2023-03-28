const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { findUser } = require("./user.controller");
// const User = require('./user.model')
module.exports = function () {
    function cookieExtractator(req) {
        let token = null;

        if (req && req.cookies.access_token) {
            token = req.cookies.access_token;
        }
        return token;
    }

    passport.use(
        "user-jwt",
        new Strategy(
            {
                secretOrKey: process.env.TOKEN_SECRET,
                jwtFromRequest: cookieExtractator,
            },
            function (payload, done) {
                findUser(payload.email)
                    .then((user) => {
                        if (user) return done(null, user);
                    })
                    .catch((err) => {
                        return done(null, false);
                    });
            }
        )
    );
};
