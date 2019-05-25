const express = require('express');
const router = express.Router();
const { create } = require('./user');
const { isAuth } = require('../auth/middlewares');


router.post('/create', isAuth, create);

module.exports = router;

