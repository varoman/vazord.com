const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../db/models/user');
const { JWT_SECRET } = require('../../utils/secrets');
const { NOT_FOUND, UNAUTHORIZED, SERVER_ERR } = require('../../utils/codes');
const {
    USER_NOT_EXISTS,
    WRONG_CREDENTIALS,
    SERVER_ERROR,
} = require('../../utils/messages');


const login = async (req, res) => {

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user)
        return res
            .status(NOT_FOUND)
            .json({ message: USER_NOT_EXISTS });

    const passMatch = await bcrypt.compare(password, user.password);

    if(!passMatch)
        return res
            .status(UNAUTHORIZED)
            .json({ message: WRONG_CREDENTIALS });

    jwt.sign({ role: user.role, email: user.email }, JWT_SECRET, (err, token) => {
        if (err)
            return res.status(SERVER_ERR).json({ message: SERVER_ERROR });

        res.json({
            token,
            user: { email: user.email, name: user.name, role: user.role }
        });
    });
};


module.exports = {
    login,
};
