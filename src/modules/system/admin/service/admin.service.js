const jwt = require('jsonwebtoken')

const generateAccessToken = function(data){
    jwt.sing({id:data.id,email:data.email},process.env.TOKEN_SECRET,{
        expiresIn:"8h",
        issuer:data.email
    })
}

module.exports.generateAccessToken = generateAccessToken
