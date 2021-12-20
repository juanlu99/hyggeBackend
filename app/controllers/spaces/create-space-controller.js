"use strict";

const Joi = require("joi");
const createJsonError = require("../../errors/create-json-error");
const { isAdmin } = require("../../helpers/utils");
const { addSpace } = require("../../repositories/spaces-repository");

const schema = Joi.object().keys({
  descripcion: Joi.string().min(10).max(200).required(),
  aforo: Joi.number().integer().positive().min(1).max(50),
  precioDiario: Joi.number().integer().positive().min(10).max(500),
});

async function createSpace(req, res) {
  try {
    const { role } = req.auth;
    isAdmin(role);

    const { body } = req;

    await schema.validateAsync(body);
    const spaceId = await addSpace(body);

    res.status(201);
    res.send({ message: `Coche ${spaceId} creado correctamente` });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createSpace;
