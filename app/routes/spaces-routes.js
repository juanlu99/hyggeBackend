'use strict';

const express = require(`express`);

const createSpace = require('../controllers/spaces/create-space-controller');
const createReviewSpaceById = require('../controllers/spaces/create-review-by-space-id-controller');
const { getReviewsBySpaceId } = require('../controllers/spaces/get-reviews-by-space-id');
const updateSpaceById = require('../controllers/spaces/update-space-by-id-controller');
const deleteSpaceByID = require('../controllers/spaces/delete-space-by-id-controller');
const getSpaceById = require('../controllers/spaces/get-space-by-id-controller');
const getSpaces = require('../controllers/spaces/get-spaces-controller');
const validateAuth = require('../middlewares/validate-auth');
const addFavouriteBySpaceId = require('../controllers/spaces/fav-sepaces-users');
const deleteReviewById = require('../controllers/spaces/delete-reviews-by-id-controller');

const router = express.Router();

// Endpoints públicos
router.route(`/`).get(getSpaces);

// Endpoints privados
router.route('/').all(validateAuth).post(createSpace);
router.route(`/:spaceId/reviews`).all(validateAuth).post(createReviewSpaceById);
router.route(`/:id`).all(validateAuth).get(getSpaceById).delete(deleteSpaceByID).put(updateSpaceById);
router.route(`/:id/reviews`).all(validateAuth).get(getReviewsBySpaceId);
router.route(`/:id/reviews/:idReview`).all(validateAuth).delete(deleteReviewById);
router.route('/:id/favs').all(validateAuth).post(addFavouriteBySpaceId);

module.exports = router;
