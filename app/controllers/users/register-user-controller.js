'use strict';

const bcrypt = require('bcryptjs/dist/bcrypt');
const Joi = require('joi');
const randomstring = require('randomstring');
const { createUser, findUserByEmail } = require('../../repositories/users-repository');
const throwJsonError = require('../../errors/throw-json-error');
const createJsonError = require('../../errors/create-json-error');
const { sendMailRegister } = require('../../helpers/mail-smtp');
const schema = Joi.object().keys({
  name: Joi.string().min(3).max(40).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
  verifyPassword: Joi.ref('password'),
});

async function registerUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { name, email, password } = body;
    const user = await findUserByEmail(email);
    if (user) {
      throwJsonError(400, 'Este usuario ya existe.');
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const verificationCode = randomstring.generate(64);
    const userDB = {
      name,
      email,
      passwordHash,
      verificationCode,
    };
    const userID = await createUser(userDB);
    await sendMailRegister(name, email, verificationCode);
    res.status(201).send({ id: userID });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = registerUser;
