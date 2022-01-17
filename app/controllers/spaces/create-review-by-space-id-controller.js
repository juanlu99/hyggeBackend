'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { addReview, findSpaceById } = require('../../repositories/spaces-repository');

const schema = Joi.number().positive().required();
const schemaBody = Joi.object().keys({
  puntuation: Joi.number().integer().min(0).max(5).required(),
  review: Joi.string().min(5).max(255).required(),
});

async function createReviewSpaceById(req, res) {
  try {
    const { id: userId } = req.auth;
    const { spaceId } = req.params;
    await schema.validateAsync(spaceId);
    const { body } = req;
    await schemaBody.validateAsync(body);

    const space = findSpaceById(spaceId);
    if (!space) {
      throwJsonError(400, `El espacio no existe`);
    }

    const { puntuation, review } = body;

    const reviewId = await addReview(spaceId, userId, puntuation, review);

    res.status(201).send({ reviewId });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createReviewSpaceById;
