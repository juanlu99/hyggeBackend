'use strict';

const Joi = require('joi');

const createJsonError = require('../../errors/create-json-error');
const isAdmin = require('../../helpers/isAdmin');
const { addBooking } = require('../../repositories/bookings-repository');

const schema = Joi.number().integer().positive().required();

async function createBooking(req, res) {
  try {
    isAdmin(req);
    const idUser = req.auth.id;
    const idSpace = req.body.idSpace;

    await schema.validateAsync(idSpace);
    await addBooking(idUser, idSpace);

    res.status(201);
    res.send({
      message: `Su reserva se ha creado correctamente. 
      En breve le enviaremos un correo con la disponibildad del mismo.
      Saludos cordiales del servicio de atención de Hygge.`,
    });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = createBooking;
