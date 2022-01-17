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

async function updateSpace(id, space) {
  const { description, capacity, diary_price } = space;
  const now = new Date();
  const pool = await getPool();
  const sql = `
    UPDATE spaces
    SET description = ?, capacity = ?, diary_price = ?, updatedAt = ?
    WHERE idSpace = ?`;
  const [result] = await pool.query(sql, [description, capacity, diary_price, now, id]);

  return result.affectedRows === 1;
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

async function addFavourite(idSpace, idUser) {
  const pool = await getPool();
  const sql = `
  insert into favourites (idSpace, idUser) values (?, ?)
  `;
  await pool.query(sql, [idSpace, idUser]);

  return true;
}

async function removeReviewById(id) {
  const pool = await getPool();
  const sql = 'DELETE FROM ratings WHERE idRating = ?';
  await pool.query(sql, id);

  return true;
}

async function findReviewById(id) {
  const pool = await getPool();
  const sql = 'SELECT * FROM ratings WHERE idRating = ?';
  const [ratings] = await pool.query(sql, id);

  return ratings[0];
}

module.exports = {
  findAllSpaces,
  addReview,
  findReviewsBySpaceId,
  findSpaceById,
  addSpace,
  removeSpaceById,
  updateSpace,
  addFavourite,
  findReviewById,
  removeReviewById,
};
