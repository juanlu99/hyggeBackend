"use strict";

const getPool = require("../infrastructure/database");

async function addBooking(reservas) {
  const pool = await getPool();
  const now = new Date();
  const consulta = `INSERT INTO reservas(
      fecha,
      precio,
      idUser,
      idEspacio,
      aceptada,
      createdAt
      ) VALUES (?, ?, ?, ?, ?)`;

  const { fecha, precio, idUser, idEspacio, aceptada } = espacios;
  const [created] = await pool.query(consulta, [
    fecha,
    precio,
    idUser,
    idEspacio,
    aceptada,
    now,
  ]);
}

module.exports = {
  addBooking,
};
