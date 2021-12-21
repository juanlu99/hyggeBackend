"use strict";

const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const createJsonError = require("../../errors/create-json-error");
const throwJsonError = require("../../errors/throw-json-error");
const { findUserByEmail } = require("../../repositories/users-repository");
const schema = Joi.object().keys({
  username: Joi.string().email().required(),
  password: Joi.string().min(4).max(20).required(),
});

async function loginUser(req, res) {
  try {
    const { body } = req;
    await schema.validateAsync(body);
    const { username, password } = body;
    const user = await findUserByEmail(username);
    if (!user) {
      throwJsonError(
        403,
        "El e-mail y/o contraseña no son correctos. Inténtelo de nuevo."
      );
    }
    const { id, name, password: passwordHash, role, verifiedAt } = user;
    const isValidPassword = await bcrypt.compare(password, passwordHash);
    if (!isValidPassword) {
      throwJsonError(
        403,
        "El e-mail y/o contraseña no son correctos. Inténtelo de nuevo."
      );
    }
    if (!verifiedAt) {
      throwJsonError(
        401,
        "Esta cuenta aún no está activada. Compruebe su correo para user el link de activación."
      );
    }
    const tokenPayload = { id, name, role };
    const { JWT_SECRET } = process.env;
    const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "60m" });
    const response = {
      accessToken: token,
      expiresIn: "60m",
    };
    res.status(200).send(response);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = loginUser;
