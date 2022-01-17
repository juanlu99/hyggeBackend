"use strict";

const createJsonError = require("../../errors/create-json-error");
const { isAdmin } = require("../../helpers/utils");
const { findAllUsers } = require("../../repositories/users-repository");

async function getUsers(req, res) {
  try {
    const { role } = req.auth;

    if (role !== "Admin") {
      throwJsonError(401, "No tienes permisos para realizar esta acción");
    }

    isAdmin(role);

    const users = await findAllUsers();

    res.status(200);
    res.send({ data: users });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getUsers;
