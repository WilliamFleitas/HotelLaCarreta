import React, { useState } from "react";
// import { MiniRoom, Reservation } from "../../types/Reservation";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { ReservationRowType, ReservationType } from "../../types/Reservation";
import dayjs from "dayjs";
import MiniRoomCard from "../habitaciones/MiniRoomCard";

const ReservationsRow = ({ id, room, reservation }: ReservationRowType) => {
  const [deploy, setDeploy] = useState(false);
  return (
    <div
      key={id as string}
      className="h-full w-full flex flex-col gap-4 break-words  bg-[#ac796e] border-2 p-5 rounded-2xl my-5 py-2"
    >
      <div className="w-full h-full place-items-center  text-white">
        <h2 className="text-[20px] py-5">Reservas de la habitación {room.name} </h2>

        <div className="grid grid-cols-2 gap-5  text-[#2f2e2e]">
          
          <img
            className="items-start justify-start h-20 w-24 rounded-lg border"
            src={room.images[0]}
          />
          <p>ID: {room.id}</p>
        </div>

        <div className=" text-center items-center justify-center ">
          {reservation.map((e: ReservationType) => {
            return (
              <div>
                <div className="select-none w-full  grid grid-cols-4 mt-2 place-items-center border-2  bg-[#fcbc73] rounded-t-2xl text-[#2f2e2e]">
                  <p>Datos del huésped</p>
                  <p>Fecha de reserva</p>
                  <p>Datos del pago</p>
                  <p>Días reservados</p>
                </div>

                <div className="grid grid-cols-4 p-3 gap-5 text-black bg-[#928282]  rounded-b-lg mb-8 border-2">
                  <div className="text-start items-start justify-start ">
                    <p>Nombre: {e.name}</p>
                    <hr></hr>
                    <p>Email: {e.email}</p>
                    <hr></hr>
                    {e.dni ? (
                      <div>
                        {" "}
                        <p>DNI: {e.dni}</p>
                        <hr></hr>{" "}
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>

                  <div className="text-start items-start justify-start ">
                    <p>
                      Entrada: {dayjs(e.entryDate).format("YYYY/MM/DD")} 12:00AM
                    </p>
                    <hr></hr>
                    <p>
                      Salida: {dayjs(e.exitDate).format("YYYY/MM/DD")} 10:00AM
                    </p>
                    <hr></hr>
                    <p>Cantidad de noches: {e.nightQuantity}</p>
                    <hr></hr>
                  </div>

                  <div className="text-start items-start justify-start ">
                    <p>Pago: {e.payment}</p>
                    <hr></hr>
                    <p>Precio total: {e.payAmount}</p>
                    <hr></hr>
                    <p>Adultos: {e.adults}</p>
                    <hr></hr>
                    <p>Niños: {e.childs}</p>
                    <hr></hr>
                  </div>

                  <div className="text-center items-center justify-center">
                    {e.reservedDays.map((e) => {
                      const res = dayjs(e).format("YYYY/MM/DD");
                      return (
                        <div>
                          <p>{res}</p>
                          <hr></hr>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <IoIosArrowDropdownCircle
        onClick={() => setDeploy(!deploy)}
        className={`w-6 h-6 text-gray-700 absolute right-24 cursor-pointer duration-300 ${
          deploy && "rotate-180"
        }`}
      /> */}
      {/* {deploy && (
        <>
          <p className="font-bold self-center mt-2 text-gray-600">
            Habitaciones
          </p>
          <div className="flex flex-row flex-wrap gap-6 mx-4">
            {rooms.map((room) => (
              <MiniRoomCard
                id={room.id}
                name={room.name}
                price={room.price}
                capacity={room.capacity}
                image={room.image}
              />
            ))}
          </div>
        </>
      )} */}
    </div>
  );
};

export default ReservationsRow;
