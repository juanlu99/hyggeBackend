"use strict";

const Joi = require("joi");
const { isAdmin } = require("../../helpers/utils");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const {
  findBookingById,
  removeBookingById,
} = require("../../repositories/espacios-repository");

const schema = Joi.number().positive().required();

async function deleteBookingById(req, res) {
  try {
    const { idReserva } = req.params;
    await schema.validateAsync(idReserva);

    const booking = await findBookingById(idReserva);
    if (!booking) {
      throwJsonError(400, "Esta reserva no existe");
    }
    const { role } = req.auth;
    const { user_id: idUser } = booking;
    if (!role === "admin" || !userId === id) {
      throwJsonError(403, "No tienes permisos para realizar esta acción");
    }

    await removeBookingById(id);

    res.status(204).end();
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteBookingById;
