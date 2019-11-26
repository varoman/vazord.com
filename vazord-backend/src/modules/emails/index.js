const nodemailer = require('nodemailer');
const { EMAIL_ACCOUNT, EMAIL_PASSWORD } = process.env;


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD,
    }
});


const sendMail = ({ to, subject, content }) => {
    transporter.sendMail({
        from: 'vazord@info.com',
        to,
        subject,
        html: content
    });
};


module.exports = sendMail;
