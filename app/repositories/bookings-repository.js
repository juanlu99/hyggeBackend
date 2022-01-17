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

async function findBookingByID(id) {
  const pool = await getPool();
  const sql = 'select * from bookings where idBooking = ?';
  const [booking] = await pool.query(sql, id);
  return booking[0];
}

module.exports = { findAllBookings, findBookingByID };
