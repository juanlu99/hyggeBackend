"use strict";
const Joi = require("joi");

const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error.js");
const sendMailConfirmationBooking = require("../../helpers/mail-smtp");
const sendMailChangeBooking = require("../../helpers/mail-smtp");
const { isUser } = require("../../helpers/utils");
const { addBooking } = require("../../repositories/espacios-repository");

const schema = Joi.object().keys({
  idReserva: Joi.string().min(3).max(20).required(),
  idEspacio: Joi.string().min(2).max(220).required(),
  fecha: Joi.number()
    .integer()
    .positive()
    .min(2022)
    .max(new Date().getFullYear()),
  idUser: Joi.string().valid(),
  equipamiento: Joi.string().min(3).max(220).required(),
});

async function createBooking(req, res) {
  try {
    const { role } = req.auth;
    isUser(role);

    const { body } = req;

    await schema.validateAsync(body);
    const idEspacio = await addBooking(body);

    res.status(201);
    res.send({
      message: `Su reserva en ${idEspacio} se ha creado correctamente. 
      En breve le enviaremos un correo con la disponibildad del mismo.
      Saludos cordiales del servicio de atención de Hygge.`,
    });
  } catch (error) {
    createJsonError(error, res);
  }
  await sendMailConfirmationBooking(nombre, email, idReserva);

  //enviar correo de cambio de reserva o no posible reserva.

  await sendMailChangeBooking(nombre, email);
  await sendMailCancelBooking(nombre, email, idReserva);
}

module.exports = createBooking;
