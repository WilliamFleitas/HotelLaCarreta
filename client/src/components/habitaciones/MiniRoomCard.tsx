import React from "react";
import { MiniRoom } from "../../types/Reservation";

const MiniRoomCard = ({ image, name, capacity, price }: MiniRoom) => {
  return (
    <div className="flex flex-row gap-4">
      <img src={image} alt="" className="w-32 rounded-md" />
      <div>
        <p className="text-md">{name}</p>
        <p className="text-sm text-gray-500">
          Capacidad: {capacity.toString()} personas
        </p>
        <p className="text-md">{price.toString()} GS / noche</p>
      </div>
    </div>
  );
};

export default MiniRoomCard;
