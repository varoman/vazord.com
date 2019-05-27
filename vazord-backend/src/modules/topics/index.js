const express = require('express');
const router = express.Router();
const { create, list, update } = require('./topics');
const { isAuth } = require('../auth/middlewares');


router.post('/create', isAuth, create);
router.post('/update', isAuth, update);
router.get('/all', list);


module.exports = router;

