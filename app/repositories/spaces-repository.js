'use strict';

const getPool = require(`../infrastructure/database`);

async function findAllSpaces() {
  const pool = await getPool();
  const sql = `SELECT * FROM spaces`;
  const [spaces] = await pool.query(sql);
  return spaces;
}

async function findSpaceById(id) {
  const pool = await getPool();
  const sql = 'SELECT * FROM spaces WHERE idSpace = ?';
  const [spaces] = await pool.query(sql, id);
  return spaces[0];
}

module.exports = {
  findAllSpaces,
  findSpaceById,
};
