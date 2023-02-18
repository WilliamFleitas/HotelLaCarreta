import dayjs from "dayjs";

const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

interface payEmailType {
    name: string;
    email: string;
    adults: number;
    childs: number;
    entryDate: string;
    nightQuantity: number;
    payAmount: number;
    id: string;
}
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASSWORD
    }
  });

const payReservationEmail = (response: payEmailType, labelDebt: string) => {
    
   const entryDate = dayjs(response.entryDate).format("YYYY/MM/DD")
    return {
      from: `La Carreta Posada Turistica`,
      to: `${response.email}`,
      subject: `Confirmación de reserva de posada la Carreta`,
      text: `
      Reserva de ${labelDebt.slice(10)}.
        -Habitación reservada para la fecha: ${entryDate}.
        -Horario de entrada: 12:00AM.
        -Horario de salida: 10:00AM.
        -Costo total: ${response.payAmount}GS.
        -Reservado a nombre de: ${response.name}.
        -Codigo de la reserva: ${response.id}.
        
                 Lo esperamos!
      `
    }
  };

const revertReservationEmail = (emailUser: string) => {

  return {
    from: "La Carreta Posada Turistica",
    to: `${emailUser}`,
    subject: "No se pudo concretar la reserva",
    text : `
    Administración: No se pudo concretar el pago por la habitación por lo que se cancelo la reserva, si hubo algún pago estos se cancelaron, revise los datos y intente de nuevo!
    `
  }
};

const emailContactToAdmin = (prop: {name: string, lastname: string, subject: string, message: string, email: string}) => {

  return {
    from: `${prop.name}  ${prop.lastname}`,
    to: `will-f1@hotmail.com`,
    subject: `${prop.subject}`,
    text : `
    mensaje: ${prop.message},
    email del usuario: ${prop.email}
    `
  }
};

module.exports = {
    payReservationEmail,
    revertReservationEmail,
    emailContactToAdmin ,
    transporter
}