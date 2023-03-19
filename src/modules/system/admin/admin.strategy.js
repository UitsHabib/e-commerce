const passport = require('passport')
const {Strategy} = require('passport-jwt')
const Admin = require('./admin.model')
module.exports = function(){

    function cookieExtractator (req){
        let token  = null

        if(req && req.cookies.access_token){
            token = req.cookies.access_token
        }
        return token
    }

    passport.use('admin-jwt', new Strategy({secretOrKey: process.env.TOKEN_SECRET, jwtFromRequest: cookieExtractator}, function (payload,done){

        Admin.findOne({
            where: {
                id: payload.id,
            },
        }).then((user) => {
            if (user) return done(null, user);
            return done(null, false);
        });


    }))

}
