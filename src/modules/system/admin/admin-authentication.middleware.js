const passport = require('passport')

function AuthStrategy  (req, res, next){
    const auth = passport.authenticate('admin-jwt',function(err,admin){
        if(err){
            console.log(err)
            return res.status(500).send('Internal server error')
        }

        if(!admin) return res.status(401).send('Unauthenticated user')
        req.logIn(user,{session:false},function(err){
            if(err) next(err)
            req.admin = admin
            next()
        })
    })
    auth(req,res,next)
}

module.exports.AuthStrategy = AuthStrategy
