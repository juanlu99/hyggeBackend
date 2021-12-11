"use strict";

const getPool = require(`../infrastructure/database`);

async function findAllSpaces() {
  const pool = await getPool();
  const sql = `SELECT * FROM espacios`;
  const [cars] = await pool.query(sql);
  return cars;
}

module.exports = {
  findAllSpaces,
};
