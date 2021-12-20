"use strict";

const express = require("express");
const getUsers = require("../controllers/users/get-users-controller");
const validateAuth = require("../middlewares/validate-auth");
const router = express.Router();

router.route("/").get(getUsers);

module.exports = router;
