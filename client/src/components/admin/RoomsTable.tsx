import React from "react";
import { Room } from "../../types/Reservation";
import RoomsRow from "./RoomsRow";
import { IoMdAddCircle } from "react-icons/io";

const RoomsTable = () => {
  const rooms = [
    {
      id: "12ADAL10",
      price: 100,
      capacity: 3,
      enabled: true,
      name: "Habitacion Estandar",
      preDescription: "Habitacion con baño, minibar.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam doloremque animi harum modi nam veniam labore necessitatibus quo minima. Quaerat dignissimos, nesciunt reiciendis aliquam perferendis beatae facilis voluptatum delectus esse.",
      images: [
        "https://www.stanzahotel.com/wp-content/uploads/2020/07/2020_stanza_hotel_habitacion_sencilla_01.jpg",
      ],
    },
    {
      id: "12ADAL10",
      price: 100,
      capacity: 3,
      enabled: false,
      name: "Habitacion Estandar",
      preDescription: "Habitacion con baño, minibar.",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quisquam doloremque animi harum modi nam veniam labore necessitatibus quo minima. Quaerat dignissimos, nesciunt reiciendis aliquam perferendis beatae facilis voluptatum delectus esse.",
      images: [
        "https://www.stanzahotel.com/wp-content/uploads/2020/07/2020_stanza_hotel_habitacion_sencilla_01.jpg",
      ],
    },
  ];
  return (
    <div className="w-full min-h-screen bg-gray-300 flex flex-col items-center justify-start">
      <div className="flex flex-col w-11/12 bg-white rounded-xl min-h-[600px] px-6 py-4 gap-4 mt-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-gray-700 text-xl">Habitaciones</p>
          <IoMdAddCircle className="h-8 w-8 cursor-pointer text-green-600 hover:scale-110 hover:text-green-400 duration-300" />
        </div>

        {rooms.length &&
          rooms.map((room: Room) => (
            <RoomsRow
              id={room.id}
              name={room.name}
              capacity={room.capacity}
              description={room.description}
              preDescription={room.preDescription}
              images={room.images}
              price={room.price}
              enabled={room.enabled}
            />
          ))}
      </div>
    </div>
  );
};

export default RoomsTable;
