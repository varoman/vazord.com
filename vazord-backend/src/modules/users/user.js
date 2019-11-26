const User = require('../../db/models/user');
const TempUser = require('../../db/models/temp-user');
const { BAD_REQUEST, CREATED, NO_BODY } = require('../../utils/codes');
const { USER_CREATED, USER_CREATED_EMAIL, USER_EXISTS, WRONG_TOKEN } = require('../../utils/messages');
const sendEmail = require('../emails/');


const { NODE_ENV } = process.env;

const create = async (req, res) => {
    const { name, password, token } = req.body;

    const tempUser = await TempUser.findOne({ where: { token } });
    if (!tempUser)
        return res.status(BAD_REQUEST).json( { message: WRONG_TOKEN });

    const userExists = await User.findOne({ where: { email: tempUser.email } });
    if (userExists)
        return res
            .status(BAD_REQUEST)
            .json( { message: USER_EXISTS });

    User
        .create({
            email: tempUser.email,
            name,
            password,
            role: tempUser.role,
    })
        .then(() => {
            TempUser.destroy({ where: { token: tempUser.token } })
                .then(() => res.status(CREATED).json({ message: USER_CREATED }));
        })
        .catch(err => res.status(BAD_REQUEST).json( { message: err.errors[0].message }));
};

const createTempUser = async (req, res) => {
    const { email, role } = req.body.user;

    const userExists = await User.findOne({ where: { email } });
    if (userExists)
        return res
            .status(BAD_REQUEST)
            .json( { message: USER_EXISTS });

    TempUser
        .create({
            email,
            role,
            token: ''
        })
        .then((user) => {
            sendMail(user);
            res.status(CREATED).json({ message: USER_CREATED_EMAIL });
        })
        .catch(err => res.status(BAD_REQUEST).json( { message : err.errors[0].message }));
};

const list = async (req, res) => {
    let users = await User.findAll({ attributes: [ 'id', 'email', 'name', 'role' ] });
    users = users.filter(user => user.email !== req.user.email);
    res.send(users);
};

const remove = (req, res) => {
    const { id } = req.body;
    User
        .destroy({ where: { id }})
        .then(res.sendStatus(NO_BODY));
};

const objectToBase64 = data => {
    const buff = new Buffer(JSON.stringify(data));
    return  buff.toString('base64');
};

const sendMail = ({ email, token, role }) => {
    const appUrl = NODE_ENV === 'heroku' ? 'https://vazord-client.herokuapp.com/admin' : 'http://localhost:3000/admin';
    const base64data = objectToBase64({ email, token: token, role });
    sendEmail({
        to: email,
        subject: 'Invitation to Register',
        content: `<a target="_blank" href="${appUrl}/register/${base64data}">Click this link to activate your account</a>`
    });
};

module.exports = {
    create,
    createTempUser,
    list,
    remove,
};
