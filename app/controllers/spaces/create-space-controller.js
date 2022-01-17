'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const isAdmin = require('../../helpers/isAdmin');
const { addSpace } = require('../../repositories/spaces-repository');

const schema = Joi.object().keys({
  description: Joi.string().min(10).max(200).required(),
  capacity: Joi.number().integer().positive().min(1).max(50),
  diary_price: Joi.number().integer().positive().min(10).max(500),
});

async function createSpace(req, res) {
  try {
    isAdmin(req);

    const { body } = req;

    await schema.validateAsync(body);
    const spaceId = await addSpace(body);

    res.status(201);
    res.send({ message: `Espacio ${spaceId} creado correctamente` });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createSpace;
