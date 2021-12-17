"use strict";

const express = require(`express`);
const createreviewSpaceById = require("../controllers/spaces/create-review-by-space-id-controller");
const getSpaces = require("../controllers/spaces/getSpacesController");
const router = express.Router();

// Endpoints públicos
router.route(`/`).get(getSpaces);
router.route(`/:spaceId/reviews`).post(createreviewSpaceById);

// Endpoints privados

module.exports = router;
