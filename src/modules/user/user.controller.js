const User = require("./user.model");
const { tokenGenerator, refreshTokenGenerator } = require("./service/user.service");

async function addUser(req, res) {
    try {
        const { first_name, last_name, email, password } = req.body;
        const existUser = await User.findOne({ where: { email: email } });

        if (existUser) return res.status(400).send("Email already exists");

        const user = await User.create({
            first_name,
            last_name,
            email,
            password,
        });

        return res.status(201).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email: email } });

        if (!user || !user.password || !user.isValidPassword(password))
            return res.status(400).send("Invalid email or password");

        const token = await tokenGenerator(user);
        const refreshToken = await refreshTokenGenerator(user);

        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res.cookie("refresh_token", refreshToken, { httpOnly: true, sameSite: true });
        res.status(200).send(user);
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
}

async function getSignedInUserProfile(req, res) {
    return res.send(req.user);
}

async function updateProfile(req, res) {
    try {
        const { first_name, last_name } = req.body;
        const user = await User.findOne({ where: { id: req.user.id } });

        if (!user) return res.status(404).send("User not found");

        if (first_name) user.update({ first_name });

        if (last_name) user.update({ last_name });

        await user.update({ update_by: req.user.id });
        return res.status(200).send("Profile successfully updated");
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal server error");
    }
}

function logout(req, res) {
    res.clearCookie("access_token");
    return res.send("You have successfully logged out.");
}

async function changePassword(req, res) {
    try {
        const { password, new_password } = req.body;
        const user = await User.findOne({ where: { id: req.user.id } });

        if (!user || !user.password || !user.isValidPassword(password))
            return res.status(400).send("Invalid  password");

        await user.update({ password: new_password });
        return res.status(200).send("Password successfully updated");
    } catch (error) {
        return res.status(500).send("Internal server error");
    }
}

async function generateRefreshToken(req,res){
    //need to implements

}

async function findUser(email) {
    const user = await User.findOne({ where: { email: email } });
    return user;
}

module.exports.addUser = addUser;
module.exports.login = login;
module.exports.updateProfile = updateProfile;
module.exports.changePassword = changePassword;
module.exports.logout = logout;
module.exports.getSignedInUserProfile = getSignedInUserProfile;
module.exports.findUser = findUser;
module.exports.generateRefreshToken = generateRefreshToken;
