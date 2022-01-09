"use strict";

const getPool = require("../infrastructure/database");

async function addReview(idUser, idEspacio, comment, rating) {
  const pool = await getPool();
  const now = new Date();
  const sql = `INSERT
    INTO reviews (idUser, idEspacio, comment, rating, createdAt)
    VALUES (?, ?, ?, ?, ?)`;
  const [created] = await pool.query(sql, [
    idUser,
    idEspacio,
    comment,
    rating,
    now,
  ]);

  return created.insertId;
}

async function removeReviewById(id) {
  const pool = await getPool();
  const sql = "DELETE FROM reviews WHERE id = ?";
  const [reviews] = await pool.query(sql, id);

  return reviews;
}

async function findReviewById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM reviews WHERE id = ?";
  const [reviews] = await pool.query(sql, id);

  return reviews;
}

async function findReviewsByHyggeId(idEspacio) {
  const pool = await getPool();
  const sql = "SELECT * FROM reviews WHERE idEspacio = ?";
  const [reviews] = await pool.query(sql, idEspacio);

  return reviews;
}

async function findReviewsByUserId(idUser) {
  const pool = await getPool();
  const sql = `SELECT reviews.*, espacios.precio, espacios.instalaciones, espacios.actividades
    FROM reviews
    LEFT JOIN espacios ON espacios.id = reviews.idEspacio
    WHERE idUser = ?`;
  const [reviews] = await pool.query(sql, idUser);

  return reviews;
}

async function findAllReviews() {
  const pool = await getPool();
  //const sql = 'SELECT * FROM reviews';
  const sql = `SELECT reviews.*, users.name, espacios.precio, espacios.instalaciones, espacios.actividades
    FROM reviews
    INNER JOIN users ON users.id = reviews.idUser
    INNER JOIN espacios ON espacios.id = idEspacio`;
  const [reviews] = await pool.query(sql);

  return reviews;
}

async function getFavourites(idEspacio) {
  const pool = await getPool();
  const sql = `
    SELECT
    AVG(ffavourites) as media,
    COUNT(favourites) as numFavourites,
    FROM favourites WHERE idEspacios = ?`;
  const [reviews] = await pool.query(sql, idEspacio);

  return reviews[0];
}

module.exports = {
  getFavourites,
  addReview,
  findAllReviews,
  findReviewById,
  findReviewsByHyggeId,
  removeReviewById,
};
