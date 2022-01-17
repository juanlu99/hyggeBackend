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

async function addSpace(space) {
  const pool = await getPool();
  const consulta = `INSERT INTO spaces(
    description,
    capacity,
    diary_price
    ) VALUES (?, ?, ?)`;

  const { description, capacity, diary_price } = space;
  const [created] = await pool.query(consulta, [description, capacity, diary_price]);

  return created.insertId;
}

async function removeSpaceById(id) {
  const pool = await getPool();
  const sql = 'delete from spaces where idSpace = ?';
  await pool.query(sql, id);
  return true;
}

async function findSpaceById(id) {
  const pool = await getPool();
  const sql = 'SELECT * FROM spaces WHERE idSpace = ?';
  const [space] = await pool.query(sql, id);
  return space[0];
}

async function addReview(idSpace, idUser, puntuation, review) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
  INSERT INTO ratings (idSpace, idUser, score, opinion, createdAt)
  VALUES (?, ?, ?, ?, ?)`;

  const [reviews] = await pool.query(sql, [idSpace, idUser, puntuation, review, now]);

  return reviews.insertId;
}

module.exports = {
  findAllSpaces,
  addReview,
  findReviewsBySpaceId,
  findSpaceById,
  addSpace,
  removeSpaceById,
};
