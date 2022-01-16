"use strict";

const express = require(`express`);
const deleteSpaceByID = require("../controllers/spaces/delete-space-by-id-controller");
const getSpaceById = require("../controllers/spaces/get-space-by-id-controller");
const getSpaces = require("../controllers/spaces/get-spaces-controller");
const updateSpaceById = require("../controllers/spaces/update-space-by-id-controller");
const validateAuth = require("../middlewares/validate-auth");
const router = express.Router();

// Endpoints públicos
router.route(`/`).get(getSpaces);

// Endpoints privados
router
  .route(`/:id`)
  .all(validateAuth)
  .get(getSpaceById)
  .delete(deleteSpaceByID)
  .put(updateSpaceById);

module.exports = router;
