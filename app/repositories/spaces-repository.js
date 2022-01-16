"use strict";

const getPool = require(`../infrastructure/database`);

async function findAllSpaces() {
  const pool = await getPool();
  const sql = `SELECT * FROM spaces`;
  const [spaces] = await pool.query(sql);
  return spaces;
}

async function findSpaceById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM spaces WHERE idSpace = ?";
  const [spaces] = await pool.query(sql, id);
  return spaces[0];
}

async function removeSpaceById(id) {
  const pool = await getPool();
  const sql = "delete from spaces where idSpace = ?";
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
  const [result] = await pool.query(sql, [
    description,
    capacity,
    diary_price,
    now,
    id,
  ]);

  return result.affectedRows === 1;
}

module.exports = {
  findAllSpaces,
  findSpaceById,
  removeSpaceById,
  updateSpace,
};
