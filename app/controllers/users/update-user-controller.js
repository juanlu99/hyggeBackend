'use strict';

const Joi = require('joi');
const throwJsonError = require('../../errors/throw-json-error');
const createJsonError = require('../../errors/create-json-error');
const { updateProfileInfo, createAddress, findUserByID, findUserByEmail, updateVerificationCode } = require('../../repositories/users-repository');
const bcrypt = require('bcryptjs/dist/bcrypt');
const randomstring = require('randomstring');
const { sendMailUpdatedInfo } = require('../../helpers/mail-smtp');
const schemaBody = Joi.object().keys({
  name: Joi.string().min(3).max(20).required(),
  surname: Joi.string().min(3).max(20).optional(),
  password: Joi.string().min(4).max(20).optional(),
  repeatPassword: Joi.ref('password'),
  email: Joi.string().email().required(),
  province: Joi.string().min(3).max(20).optional(),
  typeStreet: Joi.string().min(3).max(20).optional(),
  nameStreet: Joi.string().min(3).max(20).optional(),
  number: Joi.number().integer().positive().optional(),
  floor: Joi.number().integer().positive().optional(),
  letter: Joi.string().min(1).max(1).optional(),
  zipCode: Joi.number().integer().positive().optional(),
});

async function updateUserByID(req, res) {
  try {
    const { auth, body } = req;
    const { id } = auth;
    const { name, email, password } = body;
    await schemaBody.validateAsync(body);
    const userLogged = await findUserByID(id);
    const userExists = await findUserByEmail(email);
    if (userExists && userExists !== id) {
      throwJsonError(409, 'Este email ya esta siendo usado por otro usuario');
    }
    const updatePassword = await bcrypt.hash(password, 12);
    const idAddress = await createAddress(body);
    await updateProfileInfo(id, body, updatePassword, idAddress);
    if (email !== userLogged.email) {
      const verificationCode = randomstring.generate(64);
      await updateVerificationCode(id, verificationCode);
      await sendMailUpdatedInfo(name, email, verificationCode);
    }
    res.status(200).send('Perfil actualizado correctamente');
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = updateUserByID;
