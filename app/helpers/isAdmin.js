'use strict';

const throwJsonError = require('../errors/throw-json-error');

async function isAdmin(req) {
  const { auth } = req;
  const { role } = auth;
  if (!role || role !== 'Admin' || role === 'User') {
    throwJsonError(403, 'No estas autorizado para esta acción.');
  }

  return true;
}

module.exports = isAdmin;
