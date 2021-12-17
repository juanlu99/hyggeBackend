"use strict";

const express = require(`express`);
const getSpaceById = require("../controllers/spaces/get-space-by-id-controller");
const getSpaces = require("../controllers/spaces/get-spaces-controller");
const validateAuth = require("../middlewares/validate-auth");
const router = express.Router();

// Endpoints públicos
router.route(`/`).get(getSpaces);
router.route(`/:id`).all(validateAuth).get(getSpaceById);

// Endpoints privados

module.exports = router;
