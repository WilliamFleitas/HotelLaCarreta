import React, { useState } from "react";
import { MiniRoom, Reservation } from "../../types/Reservation";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import MiniRoomCard from "../habitaciones/MiniRoomCard";

const ReservationsRow = ({
  id,
  email,
  rooms,
  adults,
  childs,
  entryDate,
  exitDate,
  payment,
  price,
}: Reservation) => {
  const [deploy, setDeploy] = useState(false);
  return (
    <div className="w-full flex flex-col gap-4 bg-gray-100 rounded-2xl mt-2 py-2">
      <div className="w-full grid grid-cols-6 place-items-center  text-gray-700">
        <p>{id}</p>

        <p>{email}</p>

        <p>
          {adults.toString()} adultos {childs.toString()} niños
        </p>
        <p>
          {entryDate} / {exitDate}
        </p>
        <p>{payment === "partial" ? "Seña" : "Completo"}</p>
        <p>{price.toString()} GS</p>
      </div>
      <IoIosArrowDropdownCircle
        onClick={() => setDeploy(!deploy)}
        className={`w-6 h-6 text-gray-700 absolute right-24 cursor-pointer duration-300 ${
          deploy && "rotate-180"
        }`}
      />
      {deploy && (
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
      )}
    </div>
  );
};

export default ReservationsRow;
