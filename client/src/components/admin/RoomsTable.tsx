import React, {useEffect} from "react";
import { Room } from "../../types/Reservation";
import RoomsRow from "./RoomsRow";
import { IoMdAddCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllRooms } from "../../redux/slices/RoomSlice/RoomAction";
import { Link } from "react-router-dom";

const RoomsTable = () => {
    const dispatch = useAppDispatch();
    const rooms = useAppSelector((state) => state.rooms.roomList); 
    useEffect(() => {
      dispatch(getAllRooms());
  }, [dispatch]);
  
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start ">
      <div className="flex flex-col w-11/12 bg-[#2f2e2e] border-2 rounded-xl min-h-[600px] px-6 py-4 gap-4 ">
        <div className="flex flex-row items-center justify-between">
          <p className="text-white text-xl">Habitaciones</p>
          <Link to="/admin/dashboard/createroom">
          <IoMdAddCircle className="h-8 w-8 cursor-pointer text-black hover:scale-110 hover:text-zinc-400 duration-300" />
          </Link>
        </div>

        {rooms.length &&
          rooms.map((room) => (<div key={room.id as string}>
            <RoomsRow
              id={room.id as string}
              name={room.name}
              capacity={room.capacity}
              description={room.description}
              preDescription={room.preDescription}
              images={room.images}
              price={room.price}
              enabled={room.enabled}
              roomZone={room.roomZone}
              room_features={room.room_features}
              room_services={room.room_services}
              bathroom_features={room.bathroom_features}

            />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoomsTable;
