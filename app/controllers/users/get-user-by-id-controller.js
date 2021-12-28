'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findUserByID } = require('../../repositories/users-repository');
const isAdmin = require('../../helpers/isAdmin');
const schema = Joi.number().positive().integer().required();

async function getUserByID(req, res) {
  try {
    await isAdmin(req);
    const { id } = req.params;
    await schema.validateAsync(id);
    const user = await findUserByID(id);
    if (!user) {
      throwJsonError(401, 'Este usuario no existe.');
    }
    res.status(200).send({ user });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUserByID;
