const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("./user.model");
const { send } = require("../../config/lib/email-sevice/email.service");

async function createUser(req, res) {
    try {
        const { firstName, lastName, profile_id, email, password } = req.body;

        console.log(req.body);

        const existUser = await User.findOne({
            where: { email },
        });

        if (existUser) return res.status(400).send("Already registered");

        const user = await User.create({
            firstName,
            lastName,
            profile_id,
            email,
            password,
        });

        const options = {
            to: email,
            subject: "Greetings",
        };

        await send(options, "user-creation");

        res.status(201).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
        });
        if (!user || !user.password || !user.validPassword(password))
            return res.status(400).send("Invalid Credintials");

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
            },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h", issuer: user.email }
        );
        user.dataValues.token = token;
        delete user.dataValues.password;

        res.cookie("access_token", token, {
            httpOnly: true,
            signed: true,
        });

        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function logout(req, res) {
    try {
        // Clear the authentication token cookie
        res.clearCookie("access_token");

        res.status(200).send("Logout successful");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
        });
        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function getUser(req, res) {
    const userId = req.params.id;

    const user = await User.findOne({
        where: { id: userId },
        attributes: { exclude: ["password"] },
    });

    if (!user) return res.status(404).send("User not found");

    res.send(user);
}

async function updateUser(req, res) {
    try {
        const { firstName, lastName } = req.body;
        const email = req.user.email;

        const user = await User.findOne({
            where: { email },
        });

        if (!user) return res.status(404).send("User not found");

        await User.update(
            {
                firstName,
                lastName,
            },
            { where: { email } }
        );

        const updatedUser = await User.findOne({
            where: { email },
            attributes: { exclude: ["password"] },
        });

        res.status(200).send(updatedUser);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        console.log(id);

        const user = await User.findOne({ where: { id } });
        if (!user) return res.status(404).send("User not found");

        await user.destroy();

        res.status(200).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal server error");
    }
}

async function findUser(email) {
    try {
        const user = await User.findOne({
            where: { email: email },
        });
        return user;
    } catch (err) {
        console.log(err);
    }
}

module.exports.createUser = createUser;
module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
module.exports.updateUser = updateUser;
module.exports.getUser = getUser;
module.exports.login = login;
module.exports.logout = logout;
module.exports.findUser = findUser;
