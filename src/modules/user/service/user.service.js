const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

function accessTokenGenerator(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "4h" });
}

function refreshTokenGenerator(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET);
}

function setTokenCookies(res, accessToken, refreshToken) {
    const options = {
        httpOnly: true,
    };

    const authHeader = `Bearer ${accessToken}`;
    res.setHeader("Authorization", authHeader);
    res.cookie("access_token", accessToken, options);
    res.cookie("refresh_token", refreshToken, options);
}

async function sendPasswordResetEmail(userEmail, resetUrl) {
    // Create a transporter object
    const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    // Set up email options
    const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: userEmail,
        subject: "Reset Your Password",
        html: `VAIA forget password or reset password implemented on e-commerce project. Click <a href=${resetUrl}>${resetUrl}</a> to reset your password.`,
    };
    // Send the email
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            console.log(`Email sent: ${info} ---- also --- ${info.response}`);
        }
    });
}

module.exports.accessTokenGenerator = accessTokenGenerator;
module.exports.refreshTokenGenerator = refreshTokenGenerator;
module.exports.setTokenCookies = setTokenCookies;
module.exports.sendPasswordResetEmail = sendPasswordResetEmail;
