const bcrypt = require('bcrypt');
const User = require('../../db/models/user');
const { NOT_FOUND, UNAUTHORIZED } = require('../../utils/codes');
const { USER_NOT_EXISTS, WRONG_CREDENTIALS } = require('../../utils/messages');


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

    res.end();
};


module.exports = {
    login,
};
