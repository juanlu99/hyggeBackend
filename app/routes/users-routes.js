'use strict';

const express = require('express');
const registerUser = require('../controllers/users/register-user-controller');
const loginUser = require('../controllers/users/login-user-controller');
const getProfileData = require('../controllers/users/get-profile-controller');
const validateAuth = require('../middlewares/validate-auth');
const updateUserByID = require('../controllers/users/update-user-controller');
const deleteAddress = require('../controllers/users/delete-address-controller');
const uploadImageProfile = require('../controllers/users/upload-profile-image-controller');

const router = express.Router();

//PÚBLICAS
router.route('/').post(registerUser);
router.route('/login').post(loginUser);

//PRIVADAS

router.route('/profile').all(validateAuth).get(getProfileData).put(updateUserByID);
router.route('/upload').all(validateAuth).post(uploadImageProfile);
router.route('/address').all(validateAuth).delete(deleteAddress);

module.exports = router;