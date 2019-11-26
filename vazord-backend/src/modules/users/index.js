const express = require('express');
const router = express.Router();
const { create, createTempUser, list, remove } = require('./user');
const { isAuth, isSuperUser } = require('../auth/middlewares');


router.post('/create', isAuth, isSuperUser, create);
router.post('/create-temp', isAuth, isSuperUser, createTempUser);
router.post('/delete', isAuth, isSuperUser, remove);
router.get('/all', isAuth, isSuperUser, list);

module.exports = router;

