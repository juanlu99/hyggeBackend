'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const isAdmin = require('../../helpers/isAdmin');
const { removeSpaceById, findSpaceById } = require('../../repositories/spaces-repository');
const schema = Joi.number().integer().positive().required();

async function deleteSpaceByID(req, res) {
  try {
    await isAdmin(req);
    const { id } = req.params;
    await schema.validateAsync(id);
    const space = await findSpaceById(id);
    if (!space) {
      throwJsonError(400, 'Este espacio no existe.');
    }
    await removeSpaceById(id);
    res.status(200).send('Espacio borrado con éxito.');
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = deleteSpaceByID;
