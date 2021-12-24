'use strict';

const express = require('express');
const registerUser = require('../controllers/users/register-user-controller');
const loginUser = require('../controllers/users/login-user-controller');
const getProfileData = require('../controllers/users/get-profile-controller');
const validateAuth = require('../middlewares/validate-auth');
const router = express.Router();

//PÚBLICAS
router.route('/').post(registerUser);
router.route('/login').post(loginUser);

//PRIVADAS
router.route('/profile').all(validateAuth).get(getProfileData);

module.exports = router;
