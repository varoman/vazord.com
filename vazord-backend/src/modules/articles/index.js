const express = require('express');
const router = express.Router();
const { create, list } = require('./articles');
const { isAuth } = require('../auth/middlewares');


router.post('/create', isAuth, create);
router.get('/all', isAuth, list);
/*
router.post('/update', isAuth, update);
router.post('/delete', isAuth, remove);
*/

module.exports = router;

