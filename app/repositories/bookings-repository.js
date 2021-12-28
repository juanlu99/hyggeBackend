'use strict';

const getPool = require('../infrastructure/database');

async function findAllBookings() {
  const pool = await getPool();
  const sql = `
  select * from bookings;
  `;
  const [bookings] = await pool.query(sql);
  return bookings;
}

module.exports = { findAllBookings };
