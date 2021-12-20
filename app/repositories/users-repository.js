"use strcit";

const getPool = require("../infrastructure/database");

async function findAllUsers() {
  const pool = await getPool();
  const sql = "SELECT idUser, role, nombre FROM users";
  const [users] = await pool.query(sql);

  return users;
}

module.exports = {
  findAllUsers,
};
