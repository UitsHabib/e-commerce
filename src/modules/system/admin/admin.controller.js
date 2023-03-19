const Admin = require('./admin.model')
const { generateAccessToken } = require('./service/admin.service')

async function registerAdmin (req,res){
    try {
        const { first_name, last_name, email, password } = req.body

        const existUser  = await Admin.findOne({
            where:{email:email}
        })

        if(existUser) return res.status(400).send('Email already exists')

        const admin = await Admin.create({
            first_name, last_name, email, password
        })

        return res.status(201).send(admin)


    } catch (error) {
        console.log(error)
        return res.status(500).send(error)

    }

 }

async function login(req,res){
    const { email, password } = req.body

    try {
        const admin  = await Admin.findOne({ where:{ email: email } })

        if(!admin || !admin.password || !admin.isValidPassword(password)) return res.status(400).send('Invalid email or password')
        const token = await generateAccessToken(admin)
        res.cookie('access_token', token,{ httpOnly:true, sameSite:true })

        res.status(200).send(admin)

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }

}

async function getSignedInUserProfile (req,res){
     return res.send(req.admin)

}

function update(req,res){}

function logout(req,res){}

async function findAdmin(email){
    const admin =  await Admin.findOne({ where: {email:email} })
    return admin
}

module.exports.registerAdmin = registerAdmin
module.exports.login = login
module.exports.update = update
module.exports.logout = logout
module.exports.getSignedInUserProfile = getSignedInUserProfile
module.exports.findAdmin = findAdmin
