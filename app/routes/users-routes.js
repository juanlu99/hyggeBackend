"use strict";

const express = require("express");
const deleteUserById = require("../controllers/users/delete-user-by-id-controller");
const validateAuth = require("../middlewares/validate-auth");
const router = express.Router();

router.route("/:id").delete(deleteUserById);

module.exports = router;
