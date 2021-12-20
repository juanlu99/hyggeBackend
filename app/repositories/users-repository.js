'use strict';

const getPool = require('../infrastructure/database');

async function findUserByEmail(email) {
  const pool = await getPool();
  const sql = `
  select idUser, nombre, email, password, role, verifiedAt from users where email = ?
  `;
  const [user] = await pool.query(sql, email);
  return user[0];
}

module.exports = { findUserByEmail };
