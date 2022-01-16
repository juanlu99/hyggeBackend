"use strict";

const getPool = require(`../infrastructure/database`);

async function findAllSpaces() {
  const pool = await getPool();
  const sql = `SELECT * FROM espacios`;
  const [spaces] = await pool.query(sql);
  return spaces;
}

async function findReviewsBySpaceId(idSpace) {
  const pool = await getPool();
  const sql = `SELECT * FROM ratings WHERE idSpace = ?`;
  const [reviews] = await pool.query(sql, idSpace);
  return reviews;
}

async function findSpaceById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM espacios WHERE idEspacio = ?";
  const [spaces] = await pool.query(sql, id);
  return spaces[0];
}

module.exports = {
  findAllSpaces,
  findReviewsBySpaceId,
  findSpaceById,
};
