'use strict';

const getPool = require('../infrastructure/database');

async function findAllUsers() {
  const pool = await getPool();
  const sql = 'SELECT idUser, role, name FROM users';
  const [users] = await pool.query(sql);

  return users;
}

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

async function activateUser(verificationCode) {
  const now = new Date();
  const pool = await getPool();
  const sql = `
      UPDATE users
      SET verifiedAt = ?
      WHERE verificationCode = ?
      AND verifiedAt IS NULL
    `;
  const [result] = await pool.query(sql, [now, verificationCode]);

  return result.affectedRows === 1;
}

async function getUserByVerificationCode(code) {
  const pool = await getPool();
  const sql = `
      SELECT name, email
      FROM users WHERE verificationCode = ?
    `;
  const [user] = await pool.query(sql, code);

  return user[0];
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

async function uploadUserImage(id, image) {
  const pool = await getPool();
  const sql = `
  update users set profile_image = ? where idUser = ${id}
  `;
  await pool.query(sql, [image, id]);
  return true;
}

async function updateProfileInfo(id, user, updatedPassword, idAddress) {
  const { email, name, surname } = user;
  const now = new Date();
  const pool = await getPool();
  const sql = `
  update users set email = ?, name = ?, surname = ?, password = ?, modifiedAt = ?, idAddress = ? where idUser = ?;
  `;
  await pool.query(sql, [email, name, surname, updatedPassword, now, idAddress, id]);
  return true;
}

async function createAddress(address) {
  const pool = await getPool();
  const sql = `insert into 
  addresses (province, type_street, name_street, number, floor, letter, zip_code)
  values (?, ?, ?, ?, ?, ?, ?)
  `;
  const { province, typeStreet, nameStreet, number, floor, letter, zipCode } = address;
  const [created] = await pool.query(sql, [province, typeStreet, nameStreet, number, floor, letter, zipCode]);
  return created.insertId;
}

async function deleteAddressByID(idUser, idAddress) {
  const pool = await getPool();
  const sql = `
  update users set idAddress = NULL where idUser = ?;
  delete from addresses where idAddress = ?;
  `;
  await pool.query(sql, [idUser, idAddress]);
  return true;
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

async function removeUserById(id) {
  const pool = await getPool();
  const sql = 'DELETE FROM users WHERE idUser = ?';
  await pool.query(sql, id);

  return true;
}

module.exports = {
  findAllUsers,
  createUser,
  activateUser,
  getUserByVerificationCode,
  findUserByEmail,
  findUserByID,
  uploadUserImage,
  updateProfileInfo,
  createAddress,
  deleteAddressByID,
  updateVerificationCode,
  removeUserById,
};
