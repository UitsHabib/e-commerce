const passport = require('passport')

function AuthStrategy  (req, res, next){
    const auth = passport.authenticate('admin-jwt',function(err, admin){
        if(err){
            console.log(err)
            return res.status(500).send('Internal server error')
        }

        if(!admin) return res.status(401).send('Unauthenticated user')

        req.logIn(admin, { session: false }, function (error) {

            if (error) return next(error);
            req.admin = admin.dataValues;
          return  next();
        });

    })
    auth(req,res,next)
}

module.exports.AuthStrategy = AuthStrategy
