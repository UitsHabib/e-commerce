const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

function tokenGenerator(data) {
    return jwt.sign(
        {
            id: data.id,
            email: data.email,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: "4h", issuer: data.email }
    );
}

function refreshTokenGenerator(data) {
    return jwt.sign({ id: data.id }, process.env.TOKEN_SECRET, {
        issuer: data.email,
    });
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

module.exports.tokenGenerator = tokenGenerator;
module.exports.refreshTokenGenerator = refreshTokenGenerator;
module.exports.sendPasswordResetEmail = sendPasswordResetEmail;
