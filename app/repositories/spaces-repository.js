"use strict";

const getPool = require(`../infrastructure/database`);

async function findAllSpaces() {
  const pool = await getPool();
  const sql = `SELECT * FROM espacios`;
  const [cars] = await pool.query(sql);
  return cars;
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
  findSpaceById,
  addReview,
};
