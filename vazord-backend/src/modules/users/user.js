const User = require('../../db/models/user');
const { BAD_REQUEST, CREATED } = require('../../utils/codes');
const { USER_CREATED, USER_CREATE_FAIL, USER_EXISTS } = require('../../utils/messages');


const create = async (req, res) => {
    const { name, email, role, password } = req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists)
        return res
            .status(BAD_REQUEST)
            .json( { message: USER_EXISTS });

    User
        .create({
            email,
            name,
            password,
            role,
    })
        .then(() => res.status(CREATED).json({ message: USER_CREATED }))
        .catch(err => res.status(BAD_REQUEST).json( { message : err.errors[0].message }));
};


module.exports = {
    create,
};