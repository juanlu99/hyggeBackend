'use strict';

const express = require('express');
const getBookingByID = require('../controllers/bookings/get-booking-by-id-controller');
const getBookings = require('../controllers/bookings/get-bookings-controller');
const validateAuth = require('../middlewares/validate-auth');

const router = express.Router();

//ENDPOINT ADMIN
router.route('/').all(validateAuth).get(getBookings);
router.route('/:id').all(validateAuth).get(getBookingByID);

module.exports = router;
