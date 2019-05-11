const express = require('express');
const router = express.Router();
const auth = require('./modules/auth/');

router.use('/auth', auth);

module.exports = router;
