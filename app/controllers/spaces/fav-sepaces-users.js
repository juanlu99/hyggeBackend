'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findSpaceById, addFavourite } = require('../../repositories/spaces-repository');

const schema = Joi.number().positive().required();

async function addFavouriteBySpaceId(req, res) {
  try {
    const { id: idUser } = req.auth;
    const { id: idSpace } = req.params;

    const space = await findSpaceById(idSpace);
    if (!space) {
      throwJsonError(400, 'El espacio que buscas no existe');
    }
    await addFavourite(idSpace, idUser);
    res.status(200).send('Espacio marcado como favorito.');
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = addFavouriteBySpaceId;
