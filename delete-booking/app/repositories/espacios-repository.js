"use strict";

const getPool = require("../infrastructure/database");

async function findBookingById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM reservas WHERE id = ?";
  const [users] = await pool.query(sql, id);

  return users[0];
}

async function removeBookingById(id) {
  const pool = await getPool();
  const sql = "DELETE FROM reservas WHERE id = ?";
  await pool.query(sql, id);

  return true;
}

module.exports = {
  findBookingById,
  removeBookingById,
};
