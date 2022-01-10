'use strict';

const Joi = require('joi');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const isAdmin = require('../../helpers/isAdmin');
const { findBookingByID } = require('../../repositories/bookings-repository');
const schema = Joi.number().integer().positive().required();

async function getBookingByID(req, res) {
  try {
    await isAdmin(req);
    const { id } = req.params;
    await schema.validateAsync(id);
    const booking = await findBookingByID(id);
    if (!booking) {
      throwJsonError(401, 'Esta reserva no existe.');
    }
    res.status(200).send({ booking });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getBookingByID;
