'use strict';

const nodemailer = require('nodemailer');
const { SMTP_PORT, SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;

let transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: false,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

async function sendMailRegister(nombre, email, code) {
  const mailData = {
    from: 'hyggeTeam@hygge.com',
    to: email,
    subject: 'Bienvenid@ a Hygge!!',
    text: `Hola ${nombre}, estás a un solo paso de disfrutar de Hygge: http://localhost:3000/api/v1/users/activation?code=${code}`,
    html: `Hola ${nombre}, estás a un solo paso de disfrutar de Hygge <a href="http://localhost:3000/api/v1/users/activation?code=${code}">clicka aquí</a>`,
  };

  const data = await transporter.sendMail(mailData);
  console.log(data);
  return data;
}

async function sendMailUpdatedInfo(nombre, email, code) {
  const mailData = {
    from: 'hyggeTeam@hygge.com',
    to: email,
    subject: 'Bienvenid@ a Hygge!!',
    text: `Hola ${nombre}, se ha solicitado cambiar información sensible de su cuenta en Hygge, para realizar este cambio necesitamos tu autorización: http://localhost:3000/api/v1/users/activation?code=${code}`,
    html: `Hola ${nombre}, se ha solicitado cambiar información sensible de su cuenta en Hygge, para realizar este cambio necesitamos tu autorización <a href="http://localhost:3000/api/v1/users/activation?code=${code}">clicka aquí</a>`,
  };

  const data = await transporter.sendMail(mailData);
  console.log(data);
  return data;
}

async function sendMailCorrectValidation(name, email) {
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: 'ReviewsHygge - Account activated!',
    text: `Hola ${name},\n tu cuenta ya está activada.`,
    html: `<h1>Hola ${name},</h1> tu cuenta Hygge te espera.`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendMailConfirmationBooking(name, email) {
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: 'Noticias Hygge - Reserva confirmada!',
    text: `Hola ${name},\n Tu reserva ya está confirmada, 
    solo queda celebrar el evento en tu Hygge espacio.`,
    html: `<h1>Hola ${name},</h1> buenas noticias, tu Hygge espacio te espera.`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendMailChangeBooking(name, email) {
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: 'Noticias Hygge - Upps ese espacio no tiene disponibilidad en esa fecha!',
    text: `Hola ${name},\n Lo sentimos mucho, pero en esa fecha tu espacio Hygge ya tiene un evento, 
    sería posible en otra fecha o podrías elegir otra opción de Hygge espacio que se pueda adaptar 
    a tus deseos. 
    Esperamos ansiosos que podamos darte otra opción para tu evento.`,
    html: `<h1>Hola ${name},</h1> tu Hygge espacio está ocupado.`,
  };

  const data = await transporter.sendMail(mailData);

  return data;
}

async function sendMailCancelBooking(name, email) {
  const mailData = {
    from: SMTP_USER,
    to: email,
    subject: 'ReviewsHygge - Booking!',
    text: `Hola ${name},\n sentimos mucho no poder ofrecerte el espacio escogido.
    Tienes a tu disposición otros espacios que podrían cumplir con tus necesidades.
    Estamos a tu disposición para si necesitas ayuda.
    Saludos cordiales de la administración de Hygge. `,
    html: `<h1>Hola ${name},</h1> tu reserva no hay podido ser validada.`,
  };
  const data = await transporter.sendMail(mailData);

  return data;
}

module.exports = { sendMailRegister, sendMailUpdatedInfo, sendMailCorrectValidation, sendMailConfirmationBooking, sendMailChangeBooking, sendMailCancelBooking };
