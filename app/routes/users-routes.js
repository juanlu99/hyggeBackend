'use strict';

const express = require('express');
const loginUser = require('../controllers/users/login-user-controller');
const router = express.Router();

//PÚBLICAS
router.route('/login').post(loginUser);

module.exports = router;
