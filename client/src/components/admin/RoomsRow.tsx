import React, { useState } from "react";
import { Room } from "../../types/Reservation";
import { FaToggleOn } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import EditRoomForm from "./EditRoomForm";

const RoomsRow = ({
  id,
  name,
  capacity,
  description,
  preDescription,
  images,
  price,
  enabled,
}: Room) => {
  const [edit, setEdit] = useState(false);
  return (
    <>
      <div
        className={`flex flex-row w-full bg-gray-100 gap-4 items-center justify-between rounded-xl p-4 ${
          !enabled && "bg-gray-200"
        }`}
      >
        <img src={images[0]} alt="" className="w-32 h-fit rounded-lg " />
        <div className="flex flex-col content-start w-full">
          <p className={`text-lg ${!enabled && "line-through"}`}>{name}</p>
          <p className="text-sm text-gray-500">
            Capacidad: {capacity.toString()}
          </p>
          <p>{preDescription}</p>
          <p className="bg-orange-300 px-2 py-1 w-fit rounded-lg">
            {price.toString()} GS / noche
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 h-full justify-between">
          <AiFillEdit
            className="text-gray-600 w-6 h-fit cursor-pointer"
            onClick={() => setEdit(!edit)}
          />
          <FaToggleOn
            className={`w-8 h-fit self-start  cursor-pointer ${
              enabled ? "text-green-600" : "text-red-600 rotate-180"
            }`}
          />
        </div>
      </div>
      {edit && (
        <div className="w-full bg-gray border border-gray-400 rounded-xl flex flex-col items-center">
          <EditRoomForm
            edit={edit}
            setEdit={setEdit}
            data={{
              id,
              name,
              capacity,
              description,
              preDescription,
              images,
              price,
              enabled,
            }}
          />
        </div>
      )}
    </>
  );
};

export default RoomsRow;
