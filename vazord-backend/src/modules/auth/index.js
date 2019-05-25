const express = require('express');
const router = express.Router();
const { login } = require('./auth');
const { isAuth } = require('./middlewares');

router.post('/login', login);
router.get('/isAuth', isAuth, (req, res) => res.end());

module.exports = router;

