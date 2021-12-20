"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { isAdmin } = require("../../helpers/utils");
const { findUserById } = require("../../repositories/users-repository");

const schema = Joi.number().positive();

async function deleteUserById(req, res) {
  try {
    // Obtenemos el rol del JWT
    const { role } = req.auth;
    // Chequeamos que no sea administrador
    isAdmin(role);

    // Cogemos el id
    const { id } = req.params;
    await schema.validateAsync(id);

    const user = await findUserById(id);
    if (!user) {
      throwJsonError(400, "Usuario no existe");
    }

    await removeUserById(id);

    res.status(204).send();
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteUserById;
