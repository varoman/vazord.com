const express = require('express');
const router = express.Router();
const { create }= require('./user');


router.post('/create', create);

module.exports = router;

