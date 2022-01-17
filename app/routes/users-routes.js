'use strict';

const express = require('express');
const getUsers = require('../controllers/users/get-users-controller');
const registerUser = require('../controllers/users/register-user-controller');
const loginUser = require('../controllers/users/login-user-controller');
const getProfileData = require('../controllers/users/get-profile-controller');
const validateAuth = require('../middlewares/validate-auth');
const updateUserByID = require('../controllers/users/update-user-controller');
const deleteAddress = require('../controllers/users/delete-address-controller');
const uploadImageProfile = require('../controllers/users/upload-profile-image-controller');
const getUserByID = require('../controllers/users/get-user-by-id-controller');
const deleteUserById = require('../controllers/users/delete-user-by-id-controller');
const validateUser = require('../controllers/users/activate-user-controller');

const router = express.Router();

//PÚBLICAS
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/activation').get(validateUser);

//PRIVADAS
router.route('/').all(validateAuth).get(getUsers);
router.route('/profile').all(validateAuth).get(getProfileData).put(updateUserByID);
router.route('/:id').all(validateAuth).get(getUserByID).delete(deleteUserById);
router.route('/upload').all(validateAuth).post(uploadImageProfile);
router.route('/address').all(validateAuth).delete(deleteAddress);

module.exports = router;
