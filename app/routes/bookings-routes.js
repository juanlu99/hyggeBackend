'use strict';

const express = require('express');
const getBookings = require('../controllers/bookings/get-bookings-controller');
const validateAuth = require('../middlewares/validate-auth');
const router = express.Router();

//ENDPOINT ADMIN
router.route('/').all(validateAuth).get(getBookings);

module.exports = router;
