const express = require('express');
const router = express.Router();
const { create, list } = require('./topics');
const { isAuth } = require('../auth/middlewares');


router.post('/create', isAuth, create);
router.get('/all', list);


module.exports = router;

