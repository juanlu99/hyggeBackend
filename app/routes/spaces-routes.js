"use strict";

const express = require(`express`);
const createSpace = require("../controllers/spaces/create-space-controller");
const getSpaceById = require("../controllers/spaces/get-space-by-id-controller");
const getSpaces = require("../controllers/spaces/get-spaces-controller");
const validateAuth = require("../middlewares/validate-auth");
const router = express.Router();

// Endpoints públicos
router.route(`/`).get(getSpaces);
router.route(`/:id`).all(validateAuth).get(getSpaceById);
router.route("/").all(validateAuth).post(createSpace);

// Endpoints privados

module.exports = router;
