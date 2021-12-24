'use strict';

const getPool = require('../infrastructure/database');

async function createUser(user) {
  const pool = await getPool();
  const sql = `
  insert into users (name, email, password, verificationCode, role, createdAt)
  values (?, ?, ?, ?, ?, ?)
  `;
  const { name, email, passwordHash, verificationCode } = user;
  const now = new Date();
  const [created] = await pool.query(sql, [name, email, passwordHash, verificationCode, 'User', now]);
  return created.insertId;
}

async function findUserByEmail(email) {
  const pool = await getPool();
  const sql = `
  select idUser, email, password, role, verifiedAt from users where email = ?
  `;
  const [user] = await pool.query(sql, email);
  return user[0];
}

async function findUserByID(id) {
  const pool = await getPool();
  const sql = `
  select * from users where idUser = ?
  `;
  const [user] = await pool.query(sql, id);
  return user[0];
}

module.exports = { createUser, findUserByEmail, findUserByID };
