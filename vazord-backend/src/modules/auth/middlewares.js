const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../utils/secrets');
const { UNAUTHORIZED } = require('../../utils/codes');
const { NOT_AUTHORIZED } = require('../../utils/messages');


const isAuth = (req, res, next) => {
    const authorization = (req.headers['authorization'] || '');
    const token = authorization.slice(authorization.indexOf('JWT ') + 4);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(UNAUTHORIZED).json({ message: NOT_AUTHORIZED});
        next();
    });
};


module.exports = {
    isAuth,
};