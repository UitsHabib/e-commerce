const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    tokenGenerator,
    refreshTokenGenerator,
    sendPasswordResetEmail,
} = require("./service/user.service.js");
const User = require("./user.model.js");

const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword } =
            req.body;

        const existUser = await User.findOne({ where: { email: email } });

        if (existUser) return res.status(400).send("User Already Exists");

        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        });

        res.status(200).send(user);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } }); // exclude possible if needed

        if (!user || !user.password || !user.validPassword(password)) {
            return res.status(400).send("Authentication Error");
        }

        const token = tokenGenerator(user);
        const refreshToken = refreshTokenGenerator(user);

        res.cookie("access_token", token, {
            httpOnly: true,
        });

        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
        });

        res.status(201).send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

async function updateUser(req, res) {
    try {
        const { firstName, lastName } = req.body;
        const user = await User.findOne({ where: { email: req.user.email } });

        if (!user) return res.status(400).send("User not found!");

        if (firstName) user.update({ firstName }); //user.firstName = firstName;
        if (lastName) user.update({ lastName }); //user.lastName = lastName;

        await user.update({ update_by: req.user.email });

        res.status(201).send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

function getSignedInUserProfile(req, res) {
    return res.status(200).send(req.user);
}

async function updatePassword(req, res) {
    try {
        const { password, newPassword } = req.body;
        console.log("neeeeeeeeeew", newPassword);
        const user = await User.findOne({ where: { id: req.user.id } });

        if (!user || !user.password || !user.validPassword(password)) {
            return res.status(400).send("Password Wrong");
        }

        await user.update({ password: newPassword });

        return res.status(200).send("Password Successfully Updated");
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

async function logout(req, res) {
    res.clearCookie("access_token");
    return res.status(200).send("Logout Successful");
}

async function requestResetPassword(req, res) {
    try {
        const { email } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) return res.status(404).send("User Not Found!");

        const resetToken = await user.generateResetToken();
        await user.save();

        const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;

        await sendPasswordResetEmail(user.email, resetUrl);

        res.status(200).send("Email Sent");
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
}

async function handleResetPasswordRequest(req, res) {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    try {
        // Find user by reset token
        const user = await User.findOne({ where: { resetToken: token } });

        if (!user || !user.isResetTokenValid(user.resetTokenExpiry))
            return res.status(400).send("Invalid Reset Token");

        user.password = newPassword;
        user.resetToken = null;

        await user.save();

        res.status(200).send("Password Reset Successful!");
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal server error");
    }
}

async function findUser(email) {
    const user = await User.findOne({ where: { email } });
    return user;
}

async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            attributes: { exclude: ["password"] },
        });
        res.status(200).send(users);
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
}

async function deleteUser(req, res) {
    const email = req.params.email;
    const user = users.find((user) => user.email === email);

    if (!user) return res.status(400).send("User not found");

    const userIndex = users.findIndex((user) => user.email === email);
    const deletedUser = users.splice(userIndex, 1);
    res.status(201).send(deletedUser);
}

module.exports.registerUser = registerUser;
module.exports.login = login;
module.exports.updateUser = updateUser;
module.exports.getSignedInUserProfile = getSignedInUserProfile;
module.exports.updatePassword = updatePassword;
module.exports.logout = logout;
module.exports.requestResetPassword = requestResetPassword;
module.exports.handleResetPasswordRequest = handleResetPasswordRequest;
module.exports.findUser = findUser;
module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
