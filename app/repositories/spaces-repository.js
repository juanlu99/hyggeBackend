"use strict";

const getPool = require(`../infrastructure/database`);

async function findAllSpaces() {
  const pool = await getPool();
  const sql = `SELECT * FROM espacios`;
  const [spaces] = await pool.query(sql);
  return spaces;
}

async function findSpaceById(id) {
  const pool = await getPool();
  const sql = "SELECT * FROM espacios WHERE idEspacio = ?";
  const [spaces] = await pool.query(sql, id);
  return spaces[0];
}

// idSpace int unsigned auto_increment primary key,
// description varchar(400),
// capacity int,
// diary_price decimal(4, 2),

async function addSpace(space) {
  const pool = await getPool();
  const consulta = `INSERT INTO espacios(
    description,
    capacity,
    diary_price
    ) VALUES (?, ?, ?)`;

  const { description, capacity, diary_price } = space;
  const [created] = await pool.query(consulta, [
    description,
    capacity,
    diary_price,
  ]);

  return created.insertId;
}

module.exports = {
  findAllSpaces,
  findSpaceById,
  addSpace,
};
