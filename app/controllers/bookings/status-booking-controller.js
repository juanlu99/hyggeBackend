'use strict';
const Joi = require('joi');

const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error.js');
const isAdmin = require('../../helpers/isAdmin');
const { sendMailConfirmationBooking, sendMailCancelBooking } = require('../../helpers/mail-smtp');
const { findBookingByID, changeStatusBooking } = require('../../repositories/bookings-repository');
const { findUserByID } = require('../../repositories/users-repository');

const schema = Joi.string().required();

async function statusBooking(req, res) {
  try {
    isAdmin(req);
    const { id: idUser } = req.auth;
    const user = await findUserByID(idUser);
    const { name, email } = user;
    const { id: idBooking } = req.params;
    const { body } = req;
    const { action } = body;

    await schema.validateAsync(action);
    const booking = await findBookingByID(idBooking);

    if (!booking) {
      throwJsonError(401, 'Esta reserva no existe.');
    }
    if (booking.acepted !== null) {
      throwJsonError(401, 'Esta reserva ya ha sido aceptada/rechazada con anterioridad.');
    }

    if (action === 'confirm') {
      await changeStatusBooking(idBooking, true);
      await sendMailConfirmationBooking(name, email);
    }
    if (action === 'refuse') {
      await changeStatusBooking(idBooking, false);
      await sendMailCancelBooking(name, email);
    }

    res.status(201);
    res.send({
      message: `El estado de su reserva ha sido modificado con exito.`,
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = statusBooking;
