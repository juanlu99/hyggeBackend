"use strict";

const express = require(`express`);
const {
  getReviewsBySpaceId,
} = require("../controllers/spaces/get-reviews-by-space-id");
const getSpaces = require("../controllers/spaces/getSpacesController");
const validateAuth = require("../middlewares/validate-auth");
const router = express.Router();

// Endpoints públicos
router.route(`/`).get(getSpaces);
router.route(`/:spaceId/reviews`).all(validateAuth).get(getReviewsBySpaceId);

// Endpoints privados

module.exports = router;
