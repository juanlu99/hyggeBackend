'use strict';

const { findReviewById, removeReviewById } = require('../../repositories/spaces-repository');
const createJsonError = require('../../errors/create-json-error');
const throwJsonError = require('../../errors/throw-json-error');
const isAdmin = require('../../helpers/isAdmin');

async function deleteReviewById(req, res) {
  try {
    isAdmin(req);

    const { id } = req.params;

    const review = await findReviewById(id);
    if (!review) {
      throwJsonError(401, 'Esta review no existe');
    }

    await removeReviewById(id);

    res.status(200);
    res.send({ message: `Review borrada con éxito` });
  } catch (err) {
    createJsonError(err, res);
  }
}

module.exports = deleteReviewById;
