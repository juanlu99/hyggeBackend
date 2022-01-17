'use strict';

const express = require(`express`);

const {
  getReviewsBySpaceId,
} = require("../controllers/spaces/get-reviews-by-space-id");
const deleteSpaceByID = require('../controllers/spaces/delete-space-by-id-controller');
const getSpaceById = require('../controllers/spaces/get-space-by-id-controller');
const getSpaces = require('../controllers/spaces/get-spaces-controller');
const validateAuth = require('../middlewares/validate-auth');

const router = express.Router();

// Endpoints públicos
router.route(`/`).get(getSpaces);

// Endpoints privados

router.route(`/:id`).all(validateAuth).get(getSpaceById).delete(deleteSpaceByID);
router.route(`/:id/reviews`).all(validateAuth).get(getReviewsBySpaceId);

module.exports = router;
