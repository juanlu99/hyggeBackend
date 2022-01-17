'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findReviewsBySpaceId } = require('../../repositories/spaces-repository');

const schema = Joi.number().positive().required();

async function getReviewsBySpaceId(req, res) {
  try {
    const { id } = req.params;
    await schema.validateAsync(id);

    const reviews = await findReviewsBySpaceId(id);
    if (reviews.length === 0) {
      throwJsonError(400, 'No existen reviews para este espacio.');
    }

    res.status(200).send(reviews);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = {
  getReviewsBySpaceId,
};
