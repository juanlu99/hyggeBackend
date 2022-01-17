'use strict';

const express = require('express');
const createBooking = require('../controllers/bookings/create-booking-controller');
const deleteBookingByID = require('../controllers/bookings/delete-bookings-by-id-controller');
const getBookingByID = require('../controllers/bookings/get-booking-by-id-controller');
const getBookings = require('../controllers/bookings/get-bookings-controller');
const statusBooking = require('../controllers/bookings/status-booking-controller');
const validateAuth = require('../middlewares/validate-auth');

const router = express.Router();

//ENDPOINT ADMIN
router.route('/').all(validateAuth).get(getBookings).post(createBooking);
router.route('/:id').all(validateAuth).get(getBookingByID).post(statusBooking).delete(deleteBookingByID);

module.exports = router;
