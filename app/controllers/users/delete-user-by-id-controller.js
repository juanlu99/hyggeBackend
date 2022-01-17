'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const { findUserByID, removeUserById } = require('../../repositories/users-repository');
const isAdmin = require('../../helpers/isAdmin');

const schema = Joi.number().positive();

async function deleteUserById(req, res) {
  try {
    // Chequeamos que no sea administrador
    isAdmin(req);

    // Cogemos el id
    const { id } = req.params;
    await schema.validateAsync(id);

    const user = await findUserByID(id);
    if (!user) {
      throwJsonError(400, 'Usuario no existe');
    }
    if (user.role === 'Admin') {
      throwJsonError(400, 'No se puede borrar este usuario por conflictos de autoridad.');
    }

    await removeUserById(id);

    res.status(200).send('User borrado correctamente.');
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteUserById;
