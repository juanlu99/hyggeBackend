"use strict";

function isUser(role) {
  if (role !== "users") {
    const error = new Error("No tienes permisos para realizar esta acción");
    error.status = 401;

    throw error;
  }

  return true;
}

module.exports = {
  isUser,
};
