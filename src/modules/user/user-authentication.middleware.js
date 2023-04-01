const passport = require("passport");

function AuthStrategy(req, res, next) {
    const auth = passport.authenticate("user-jwt", function (err, user) {
        if (err)
            return res.status(500).send("Internal Server Error from strat");

        if (!user) return res.status(401).send("Authentication Invalid");

        req.logIn(user, { session: false }, function (err) {
            if (err) return next(err);

            req.user = user;

            next();
        });
    });

    auth(req, res, next);
}

module.exports.AuthStrategy = AuthStrategy;
