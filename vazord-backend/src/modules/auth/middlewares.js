const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../../utils/secrets');
const { UNAUTHORIZED } = require('../../utils/codes');
const { NOT_AUTHORIZED, NO_PERMISSION } = require('../../utils/messages');


const getTokenFromHeaders = req => {
    const authorization = (req.headers['authorization'] || '');
    return authorization.slice(authorization.indexOf('JWT ') + 4);
};

const isAuth = (req, res, next) => {
    const token = getTokenFromHeaders(req);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(UNAUTHORIZED).json({ message: NOT_AUTHORIZED});
        req.user = decoded;
        next();
    });
};

const isSuperUser = (req, res, next) => {
    const token = getTokenFromHeaders(req);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(UNAUTHORIZED).json({ message: NOT_AUTHORIZED});
        if (decoded.role !== 'super')
            return res.status(UNAUTHORIZED).json({ message: NO_PERMISSION});
        next();
    });
};


module.exports = {
    isAuth,
    isSuperUser,
};
