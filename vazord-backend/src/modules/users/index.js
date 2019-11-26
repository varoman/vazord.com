const express = require('express');
const router = express.Router();
const { create, createTempUser } = require('./user');
const { isAuth, isSuperUser } = require('../auth/middlewares');


router.post('/create', isAuth, isSuperUser, create);
router.post('/create-temp', isAuth, isSuperUser, createTempUser);

module.exports = router;

