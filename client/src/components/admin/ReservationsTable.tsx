import React from "react";
import { Reservation } from "../../types/Reservation";

import ReservationsRow from "./ReservationsRow";

const ReservationsTable = () => {
  const reservations = [
    {
      id: "12ADAL10",
      email: "iancamu01@hotmail.com",
      rooms: [
        {
          id: "1A12O40A",
          name: "Habitacion estandar",
          price: 100,
          capacity: 2,
          image:
            "https://www.stanzahotel.com/wp-content/uploads/2020/07/2020_stanza_hotel_habitacion_sencilla_01.jpg",
        },
        {
          id: "1A12O40A",
          name: "Habitacion estandar",
          price: 100,
          capacity: 2,
          image:
            "https://www.stanzahotel.com/wp-content/uploads/2020/07/2020_stanza_hotel_habitacion_sencilla_01.jpg",
        },
        {
          id: "1A12O40A",
          name: "Habitacion estandar",
          price: 100,
          capacity: 2,
          image:
            "https://www.stanzahotel.com/wp-content/uploads/2020/07/2020_stanza_hotel_habitacion_sencilla_01.jpg",
        },
        {
          id: "1A12O40A",
          name: "Habitacion estandar",
          price: 100,
          capacity: 2,
          image:
            "https://www.stanzahotel.com/wp-content/uploads/2020/07/2020_stanza_hotel_habitacion_sencilla_01.jpg",
        },
        {
          id: "1A12O40A",
          name: "Habitacion estandar",
          price: 100,
          capacity: 2,
          image:
            "https://www.stanzahotel.com/wp-content/uploads/2020/07/2020_stanza_hotel_habitacion_sencilla_01.jpg",
        },
      ],
      adults: 4,
      childs: 2,
      price: 100,
      entryDate: "2022-12-01",
      exitDate: "2022-12-12",
      payment: "partial",
    },
  ];
  return (
    <>
      <div className="w-full h-screen bg-gray-300 flex flex-col items-center justify-center">
        <div className="flex flex-col w-11/12 bg-white rounded-xl h-[600px] px-6 py-4">
          <p className="text-gray-700 text-xl">Reservas</p>
          <div className="select-none w-full grid grid-cols-6 mt-4 place-items-center border border-gray-300 rounded-t-2xl text-gray-500">
            <p>ID</p>
            <p>Email</p>
            <p>Personas</p>
            <p>Entrada/Salida</p>
            <p>Pago</p>
            <p>Total</p>
          </div>
          {reservations.map((reserva: Reservation) => (
            <ReservationsRow
              id={reserva.id}
              email={reserva.email}
              rooms={reserva.rooms}
              adults={reserva.adults}
              childs={reserva.childs}
              price={reserva.price}
              entryDate={reserva.entryDate}
              exitDate={reserva.exitDate}
              payment={reserva.payment}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ReservationsTable;
