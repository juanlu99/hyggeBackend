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

async function updateProfileInfo(id, user, updatedPassword, idAddress) {
  const { email, name, surname } = user;
  const now = new Date();
  const pool = await getPool();
  const sql = `
  update users set email = ?, name = ?, surname = ?, password = ?, modifiedAt = ?, idAddress = ? where idUser = ?;
  `;
  const userUpdated = await pool.query(sql, [email, name, surname, updatedPassword, now, idAddress, id]);
  return true;
}

async function createAddress(user) {
  const pool = await getPool();
  const sql = `insert into 
  addresses (province, type_street, name_street, number, floor, letter, zip_code)
  values (?, ?, ?, ?, ?, ?, ?)
  `;
  const { province, typeStreet, nameStreet, number, floor, letter, zipCode } = user;
  const [created] = await pool.query(sql, [province, typeStreet, nameStreet, number, floor, letter, zipCode]);
  return created.insertId;
}

async function updateVerificationCode(id, verificationCode) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
  update users set verificationCode = ?, modifiedAt = ?, verifiedAt = NULL
  where idUser = ?
  `;
  await pool.query(sql, [verificationCode, now, id]);
  return true;
}

module.exports = { createUser, findUserByEmail, findUserByID, updateProfileInfo, createAddress, updateVerificationCode };
