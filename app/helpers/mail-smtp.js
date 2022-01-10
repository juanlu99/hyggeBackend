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

module.exports = { sendMailRegister, sendMailUpdatedInfo };
