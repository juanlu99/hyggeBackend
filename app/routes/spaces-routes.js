"use strict";

const express = require(`express`);
const getSpaces = require("../controllers/spaces/getSpacesController");
const router = express.Router();

// Endpoints públicos
router.route(`/`).get(getSpaces);

// Endpoints privados

module.exports = router;
