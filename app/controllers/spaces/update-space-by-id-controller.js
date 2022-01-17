'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const isAdmin = require('../../helpers/isAdmin');
const { findSpaceById, updateSpace } = require('../../repositories/spaces-repository');

const schemaId = Joi.number().positive().required();

const schema = Joi.object().keys({
  description: Joi.string().min(10).max(400),
  capacity: Joi.number().min(1).positive(),
  diary_price: Joi.number().min(1).positive(),
});

async function updateSpaceById(req, res) {
  try {
    const { id: idSpace } = req.params;
    await schemaId.validateAsync(idSpace);

    isAdmin(req);

    const space = await findSpaceById(idSpace);
    if (!space) {
      throwJsonError(400, 'Este espacio no existe');
    }
    const { body } = req;
    await schema.validateAsync(body);

    await updateSpace(idSpace, body);

    res.status(200);
    res.end('Espacio modificado correctamente.');
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateSpaceById;
