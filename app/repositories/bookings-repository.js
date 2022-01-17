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

async function addBooking(idUser, idSpace) {
  const pool = await getPool();

  const sql = `INSERT INTO bookings(
      idUser,
      idSpace
      ) VALUES (?, ?)`;

  const [created] = await pool.query(sql, [idUser, idSpace]);

  return created.insertId;
}

async function changeStatusBooking(idBooking, status) {
  const pool = await getPool();
  const sql = `
  update bookings
  set acepted = ?
  where idBooking = ?
  `;
  await pool.query(sql, [status, idBooking]);

  return true;
}

async function removeBookingByID(id) {
  const pool = await getPool();
  const sql = 'DELETE FROM bookings WHERE idBooking = ?';
  await pool.query(sql, id);

  return true;
}

module.exports = { findAllBookings, findBookingByID, addBooking, changeStatusBooking, removeBookingByID };
