const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    secure: false,
    service: "hotmail",
});

async function send(options, subject) {
    try {
        options.from = `"E-Commerce" <${process.env.EMAIL}>`;
        //todo
        //get html from templates database table with subject
        //options.html = dbhtml
        const info = await transporter.sendMail(options);
        console.log({
            message: "Mail sent",
            messageId: info.messageId,
        });
    } catch (err) {
        console.log(err);
    }
}

module.exports.send = send;
