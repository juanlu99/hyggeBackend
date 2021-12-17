"use strict";

const { findSpaceById } = require("../../repositories/spaces-repository");
const throwJsonError = require("../../errors/throw-json-error");
const createJsonError = require("../../errors/create-json-error");

async function getSpaceById(req, res) {
  try {
    const { id } = req.params;
    const space = await findSpaceById(id);

    if (space.length === 0) {
      throwJsonError(400, `Error parámetro no válido`);
    }

    res.status(200);
    res.send(space);
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getSpaceById;
