"use strict";

const getPool = require("../infrastructure/database");

async function findUserById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM users WHERE idUser = ?";
  const [users] = await pool.query(sql, id);

  return users[0];
}

async function removeUserById(id) {
  const pool = await getPool();
  const sql = "DELETE FROM users WHERE idUser = ?";
  await pool.query(sql, id);

  return true;
}

module.exports = {
  findUserById,
  removeUserById,
};
