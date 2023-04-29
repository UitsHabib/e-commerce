const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
    accessTokenGenerator,
    refreshTokenGenerator,
    setTokenCookies,
    sendPasswordResetEmail,
} = require("./service/user.service.js");
const { User, RefreshToken } = require("./user.model.js");

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

        const accessToken = accessTokenGenerator({ id: user.id });
        const refreshToken = refreshTokenGenerator({ id: user.id });

        // Save the refresh token in db
        await RefreshToken.create({ token: refreshToken });
        user.refreshToken = refreshToken;
        await user.save();

        setTokenCookies(res, accessToken, refreshToken);

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
    if (req && req.signedCookies) refreshToken = req.cookies["refresh_token"];

    // Delete the refresh token from the database
    await RefreshToken.destroy({ where: { token: refreshToken } });
    res.sendStatus(204);

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

async function handleRefreshTokenRequest(req, res) {
    const refreshToken = null;
    if (req && req.signedCookies) refreshToken = req.cookies["refresh_token"];

    // Check if refresh token exists
    const tokenExists = await RefreshToken.findOne({
        where: { token: refreshToken },
    });

    if (!tokenExists) {
        return res.status(401).json({ message: "Invalid refresh token" });
    }

    try {
        // Verify the refresh token
        const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET);

        // Check if the user exists
        const user = await User.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Create a new access token
        const accessToken = jwt.sign(
            { id: user.id },
            process.env.TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        // Send the new access token to the client
        // res.json({ accessToken });
        setTokenCookies(res, accessToken, refreshToken);
    } catch (err) {
        return res.status(401).json({ message: "Invalid refresh token" });
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
module.exports.handleRefreshTokenRequest = handleRefreshTokenRequest;
module.exports.findUser = findUser;
module.exports.getUsers = getUsers;
module.exports.deleteUser = deleteUser;
