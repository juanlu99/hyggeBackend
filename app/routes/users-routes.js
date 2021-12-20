'use strict';

const express = require('express');
const registerUser = require('../controllers/users/register-user-controller');
const router = express.Router();

//PÚBLICAS
router.route('/').post(registerUser);

module.exports = router;
