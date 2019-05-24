const express = require('express');
const router = express.Router();
const auth = require('./modules/auth/');
const users = require('./modules/users/');

router.use('/auth', auth);
router.use('/user', users);

module.exports = router;
