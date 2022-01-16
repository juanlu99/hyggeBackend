"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findSpaceById,
  updateSpace,
} = require("../../repositories/spaces-repository");

const schemaId = Joi.number().positive().required();

const schema = Joi.object().keys({
  description: Joi.string().min(10).max(400),
  capacity: Joi.number().min(1).positive(),
  diary_price: Joi.number().min(1).positive(),
});

async function updateSpaceById(req, res) {
  try {
    // Obtenemos el idSpace, name de variable puesto en el spaces-routes.js
    const { idSpace } = req.params;
    // Validamos el idSpace
    await schemaId.validateAsync(idSpace);

    // Recuperamos el role del JWT que viene en el Authorization
    const { role } = req.auth;
    // Comprobamos el role
    isAdmin(role);

    // Comprobamos que exites el espacio
    const space = await findSpaceById(idSpace);
    if (!space) {
      throwJsonError(400, "Este espacio no existe");
    }
    // Cogemos del body el objeto con los cambios
    const { body } = req;
    // Validamos el body
    await schema.validateAsync(body);

    // Actualizamos el espacio
    await updateSpace(idSpace, body);

    // Devolvemos que todo fue bien con un 204 - NO CONTENT
    res.status(204);
    res.end();
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateSpaceById;
