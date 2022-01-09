"use strict";

const express = require("express");

const validateAuth = require("../middlewares/validate-auth");
const deleteBookingById = require("../controllers/bookings/delete_booking");

const router = express.Router();

router.route("/:id").all(validateAuth).delete(deleteBookingById);

module.exports = router;
