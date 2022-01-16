'use strict';

const express = require('express');
const registerUser = require('../controllers/users/register-user-controller');
const loginUser = require('../controllers/users/login-user-controller');
const router = express.Router();

//PÚBLICAS
router.route('/').post(registerUser);
router.route('/login').post(loginUser);

module.exports = router;
