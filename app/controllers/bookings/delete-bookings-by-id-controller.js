'use strict';
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const isAdmin = require('../../helpers/isAdmin');
const { findBookingByID, removeBookingByID } = require('../../repositories/bookings-repository');

async function deleteBookingByID(req, res) {
  try {
    isAdmin(req);

    const { id } = req.params;

    const Booking = await findBookingByID(id);
    if (!Booking) {
      throwJsonError(401, 'Este Booking no existe');
    }

    await removeBookingByID(id);

    res.status(200);
    res.send({ message: `Booking borrado con éxito` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteBookingByID;
