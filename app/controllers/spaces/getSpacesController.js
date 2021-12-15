"use strict";

const { findAllSpaces } = require("../../repositories/spaces-repository");
const createJsonError = require("../../errors/create-json-error");

async function getSpaces(req, res) {
  try {
    const spaces = await findAllSpaces();
    res.status(200);
    res.send({ data: spaces });
  } catch (error) {
    createJsonError(error, res);
  }
}

module.exports = getSpaces;
