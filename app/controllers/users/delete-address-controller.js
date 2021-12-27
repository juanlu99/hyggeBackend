'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { deleteAddressByID, findUserByID } = require('../../repositories/users-repository');
const schema = Joi.number().integer().positive().required();

async function deleteAddress(req, res) {
  try {
    const { auth, body } = req;
    const { id } = auth;
    const { id_address } = body;
    await schema.validateAsync(id);
    await schema.validateAsync(id_address);
    await deleteAddressByID(id, id_address);
    res.status(200).send('Dirección borrada correctamente.');
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = deleteAddress;
