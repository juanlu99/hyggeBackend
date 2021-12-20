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

async function addSpace(space) {
  const pool = await getPool();
  const consulta = `INSERT INTO espacios(
    descripcion,
    aforo,
    precioDiario
    ) VALUES (?, ?, ?)`;

  const { descripcion, aforo, precioDiario } = space;
  const [created] = await pool.query(consulta, [
    descripcion,
    aforo,
    precioDiario,
  ]);

  return created.insertId;
}

module.exports = {
  findAllSpaces,
  findSpaceById,
  addSpace,
};
