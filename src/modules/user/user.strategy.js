const passport = require("passport");
const { Strategy } = require("passport-jwt");
const { findUser } = require("./user.controller");

module.exports = function () {
    function cookieExtractor(req) {
        let token = null;
        if (req && req.signedCookies) token = req.cookies["access_token"];
        return token;
    }

    passport.use(
        "user-jwt",
        new Strategy(
            {
                secretOrKey: process.env.TOKEN_SECRET,
                jwtFromRequest: cookieExtractor,
            },
            async function (payload, done) {
                try {
                    const user = await findUser(payload.email);
                    if (user) return done(null, user);
                    done(null, false);
                } catch (err) {
                    console.log(err);
                    res.status(500).send("Internal Server Error");
                }
            }
        )
    );
};
