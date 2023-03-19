const passport = require('passport')
const {Strategy} = require('passport-jwt')
module.exports = function(){

    function cookieExtractator (req,res){
        let token  = null

        if(req && req.cookies.access_token){
            token = req.cookies.access_token
        }
        return token
    }

    passport.use('admin-jwt', new Strategy({secretOrKey: process.env.TOKEN_SECRET, jwtFromRequest: cookieExtractator},function(payload,done){
        //find user
        const user = true
        if(user) return done(null,user)
        return done(null,false)
    }))

}
