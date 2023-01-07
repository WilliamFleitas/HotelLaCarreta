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
    console.log(rooms);
    useEffect(() => {
      dispatch(getAllRooms());
  }, [dispatch]);
  
  return (
    <div className="w-full min-h-screen bg-gray-300 flex flex-col items-center justify-start">
      <div className="flex flex-col w-11/12 bg-white rounded-xl min-h-[600px] px-6 py-4 gap-4 mt-6">
        <div className="flex flex-row items-center justify-between">
          <p className="text-gray-700 text-xl">Habitaciones</p>
          <Link to="/createRoom">
          <IoMdAddCircle className="h-8 w-8 cursor-pointer text-green-600 hover:scale-110 hover:text-green-400 duration-300" />
          </Link>
        </div>

        {rooms.length &&
          rooms.map((room: Room) => (<div key={room.id}>
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
            </div>
          ))}
      </div>
    </div>
  );
};

export default RoomsTable;
