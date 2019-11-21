const express = require('express');
const router = express.Router();
const { create, list, getOne, remove } = require('./articles');
const { isAuth } = require('../auth/middlewares');


router.post('/create', isAuth, create);
router.get('/all', isAuth, list);
router.get('/:id', getOne);
router.post('/delete', isAuth, remove);

module.exports = router;

