'use strict';

const getPool = require(`../infrastructure/database`);

async function findAllSpaces() {
  const pool = await getPool();
  const sql = `SELECT * FROM spaces`;
  const [spaces] = await pool.query(sql);
  return spaces;
}

async function findReviewsBySpaceId(id) {
  const pool = await getPool();
  const sql = `SELECT * FROM ratings WHERE idSpace = ?`;
  const [reviews] = await pool.query(sql, id);
  return reviews;
}

async function findSpaceById(id) {
  const pool = await getPool();
  const sql = 'SELECT * FROM spaces WHERE idSpace = ?';
  const [spaces] = await pool.query(sql, id);
  return spaces[0];
}

async function removeSpaceById(id) {
  const pool = await getPool();
  const sql = 'delete from spaces where idSpace = ?';
  await pool.query(sql, id);
  return true;
}

async function findSpaceById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM espacios WHERE idEspacio = ?";
  const [space] = await pool.query(sql, id);
  return space[0];
}

async function addReview(idSpace, idUser, puntuation, review) {
  const pool = await getPool();
  const sql = `
  INSERT INTO reviews (idEspacio, idUser, puntuacion, opinion)
  VALUES (?, ?, ?, ?)`;

  const [reviews] = await pool.query(sql, [
    idUser,
    idSpace,
    puntuation,
    review,
  ]);

  return reviews.insertId;
}

module.exports = {
  findAllSpaces,
  addReview,
  findReviewsBySpaceId,
  findSpaceById,
  removeSpaceById,
};
