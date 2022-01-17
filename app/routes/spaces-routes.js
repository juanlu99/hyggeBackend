"use strict";

const express = require(`express`);
const createreviewSpaceById = require("../controllers/spaces/create-review-by-space-id-controller");
const getSpaces = require("../controllers/spaces/getSpacesController");
const validateAuth = require("../middlewares/validate-auth");
const router = express.Router();

// Endpoints públicos
router.route(`/`).get(getSpaces);

// Endpoints privados
router.route(`/:spaceId/reviews`).all(validateAuth).post(createreviewSpaceById);

module.exports = router;
