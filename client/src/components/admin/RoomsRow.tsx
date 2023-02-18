import React, { useEffect, useState } from "react";
import { Room } from "../../types/Reservation";
import { FaToggleOn } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import EditRoomForm from "./EditRoomForm";
import axios from "axios";
import { getAllRooms } from "../../redux/slices/RoomSlice/RoomAction";
import { useAppDispatch } from "../../hooks";
import { Link } from "react-router-dom";


const RoomsRow = ({
  id,
  name,
  capacity,
  description,
  preDescription,
  images,
  price,
  enabled,
  roomZone,
  room_features,
  room_services,
  bathroom_features,
  handleEnable
}: Room) => {
  const dispatch = useAppDispatch();
  const [edit, setEdit] = useState(false);
  
  

  

  return (
    <>
      <div
        className={`flex flex-row w-full text-black bg-[#ac796e] gap-4 items-center justify-between rounded-xl p-4 border-2 ${
          !enabled && "bg-gray-200"
        } ${edit && "rounded-b-none"}`}
      >
        <img src={images[0]} alt="" className="w-32 h-fit rounded-lg " />
        <div className="flex flex-col content-start w-full">
        <Link to={`/roomdetail/${id}`}><p className={`text-lg ${!enabled && "line-through"}`}>{name}</p> </Link>  
          <p className="text-sm text-[#2f2e2e]">
            Capacidad: {capacity.toString()}
          </p>
          <p className="text-[#2f2e2e]">{preDescription}</p>
          <p className="bg-orange-300 px-2 py-1 w-fit rounded-lg">
            {price.toString()} GS / noche
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 h-full justify-between">
          <AiFillEdit
            className="text-gray-600 hover:text-zinc-400 w-6 h-fit cursor-pointer"
            onClick={() => setEdit(!edit)}
          />
          <FaToggleOn
            className={`w-8 h-fit self-start  cursor-pointer ${
              enabled ? "text-green-600" : "text-red-600 rotate-180"
            }`} onClick={() => handleEnable(id)}
          />
        </div>
      </div>
      {edit && (
        <div className="w-full bg-[#ac796e] border-2 border-gray-400 rounded-b-xl flex flex-col items-center">
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
              roomZone,
              room_features,
              bathroom_features,
              room_services,
              enabled,
            }}
          />
        </div>
      )}
    </>
  );
};

export default RoomsRow;
