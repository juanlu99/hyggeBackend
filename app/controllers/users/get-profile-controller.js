'use strict';
const createJsonError = require('../../errors/create-json-error');
const { findUserByID } = require('../../repositories/users-repository');

async function getUserProfile(req, res) {
  try {
    const { auth } = req;
    const { id } = auth;
    const user = await findUserByID(id);
    res.status(200).send({ user });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUserProfile;
