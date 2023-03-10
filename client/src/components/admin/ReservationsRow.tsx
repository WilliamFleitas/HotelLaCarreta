import React, { useState } from "react";
import { ReservationRowType, ReservationType } from "../../types/Reservation";
import dayjs from "dayjs";

const ReservationsRow = ({ id, room, reservation }: ReservationRowType) => {
  
  return (
    <div
      key={id as string}
      className="h-full w-full flex flex-col gap-4 break-words  bg-[#ac796e] border-2 p-5 rounded-2xl my-5 py-2"
    >
      <div className="w-full h-full place-items-center  text-[#2f2e2e]">
        <h2 className="text-[20px] py-5 text-start">Reservas de la habitación {room?.name} </h2>

        <div className="grid grid-cols-2 gap-5  text-[#2f2e2e]">
          
          <img
            className="items-start justify-start h-20 w-24 rounded-lg border"
            src={room?.images[0]}
          />
          <p className="text-end m-auto">ID: {room?.id}</p>
        </div>

        <div className=" text-center items-center justify-center ">
          
          
              <div>
                <div className="select-none w-full  grid grid-cols-4 mt-2 place-items-center border-2  bg-[#fcbc73] rounded-t-2xl text-[#2f2e2e]">
                  <p>Datos del huésped</p>
                  <p>Fecha de reserva</p>
                  <p>Datos del pago</p>
                  <p>Días reservados</p>
                </div>

                <div className="grid grid-cols-4 p-3 gap-5 text-black bg-[#928282]  rounded-b-lg mb-8 border-2">
                  <div className="text-start items-start justify-start ">
                    <p>Nombre: {reservation.name}</p>
                    <hr></hr>
                    <p>Email: {reservation.email}</p>
                    <hr></hr>
                    {reservation.dni ? (
                      <div>
                        {" "}
                        <p>DNI: {reservation.dni}</p>
                        <hr></hr>{" "}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="text-start items-start justify-start ">
                    <p>
                      Entrada: {dayjs(reservation.entryDate).format("YYYY/MM/DD")} 12:00AM
                    </p>
                    <hr></hr>
                    <p>
                      Salida: {dayjs(reservation.exitDate).format("YYYY/MM/DD")} 10:00AM
                    </p>
                    <hr></hr>
                    <p>Cantidad de noches: {reservation.nightQuantity}</p>
                    <hr></hr>
                  </div>

                  <div className="text-start items-start justify-start ">
                    <p>Pago: {reservation.payment}</p>
                    <hr></hr>
                    <p>Precio total: {reservation.payAmount}</p>
                    <hr></hr>
                    <p>Adultos: {reservation.adults}</p>
                    <hr></hr>
                    <p>Niños: {reservation.childs}</p>
                    <hr></hr>
                  </div>

                  <div className="text-center items-center justify-center">
                    {reservation.reservedDays.map((e) => {
                      const res = dayjs(e).format("YYYY/MM/DD");
                      return (
                        <div key={e}>
                          <p>{res}</p>
                          <hr></hr>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            
          
        </div>
      </div>
      
    </div>
  );
};

export default ReservationsRow;
