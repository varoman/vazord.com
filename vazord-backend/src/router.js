const express = require('express');
const router = express.Router();
const auth = require('./modules/auth');
const users = require('./modules/users');
const topics = require('./modules/topics');


router.use('/auth', auth);
router.use('/user', users);
router.use('/topic', topics);


module.exports = router;
