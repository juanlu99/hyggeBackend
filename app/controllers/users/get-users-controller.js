'use strict';

const createJsonError = require('../../errors/create-json-error');
const { findAllUsers } = require('../../repositories/users-repository');
const isAdmin = require('../../helpers/isAdmin');

async function getUsers(req, res) {
  try {
    isAdmin(req);

    const users = await findAllUsers();

    res.status(200);
    res.send({ data: users });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUsers;
