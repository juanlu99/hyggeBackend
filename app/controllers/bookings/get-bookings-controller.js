'use strict';

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const isAdmin = require('../../helpers/isAdmin');
const { findAllBookings } = require('../../repositories/bookings-repository');

async function getBookings(req, res) {
  try {
    await isAdmin(req);
    const bookings = await findAllBookings();
    if (bookings.length === 0) {
      throwJsonError(401, 'No hay reservas en el historial.');
    }
    res.status(200).send({ bookings });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getBookings;
