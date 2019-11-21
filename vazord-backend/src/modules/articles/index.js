const express = require('express');
const router = express.Router();
const { create, list, getOne, remove, update } = require('./articles');
const { isAuth } = require('../auth/middlewares');


router.post('/create', isAuth, create);
router.get('/all', isAuth, list);
router.get('/:id', getOne);
router.post('/delete', isAuth, remove);
router.post('/update', isAuth, update);

module.exports = router;

