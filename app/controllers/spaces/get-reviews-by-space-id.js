"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const {
  findReviewsBySpaceId,
} = require("../../repositories/spaces-repository");

const schema = Joi.number().positive().required();

async function getReviewsBySpaceId(req, res) {
  try {
    const { id } = req.params;
    await schema.validateAsync(id);

    const reviews = await findReviewsBySpaceId(id);

    res.status(200).send(reviews);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = {
  getReviewsBySpaceId,
};
