const nodemailer = require('nodemailer');
const mailgun = require('mailgun-js');
const { EMAIL_ACCOUNT, EMAIL_PASSWORD, MG_DOMAIN, MG_API_KEY, NODE_ENV } = process.env;


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_ACCOUNT,
        pass: EMAIL_PASSWORD,
    }
});

const sendGMail = ({ to, subject, content }) => {
    transporter.sendMail({
        from: 'vazord@info.com',
        to,
        subject,
        html: content
    });
};

const sendMgMail = ({ to, subject, content }) => {
    const mg = mailgun({ apiKey: MG_API_KEY, MG_DOMAIN });
    const data = {
        from: '<vazord@mg.vazord.com>',
        to,
        subject,
        html: content,
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
};


const sendMail = NODE_ENV === 'heroku' ? sendMgMail : sendGMail;


module.exports = sendMail;
