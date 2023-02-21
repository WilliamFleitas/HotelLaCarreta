import React, {useEffect, useState} from "react";
import { Room } from "../../types/Reservation";
import RoomsRow from "./RoomsRow";
import { IoMdAddCircle } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllRooms } from "../../redux/slices/RoomSlice/RoomAction";
import { Link } from "react-router-dom";
import axios from "axios";

const RoomsTable = () => {
    const dispatch = useAppDispatch();
    const rooms = useAppSelector((state) => state.rooms.roomList);
    const loading = useAppSelector((state) => state.rooms.loading) ;
    const [enabledButton, setEnabledButton] = useState(true);
  
    const handleEnable = (id:string) => {
      const BackUrl = (import.meta.env.VITE_BACK_URL as string);
    
        axios.put(`${BackUrl}/rooms/toggle/${id}`).then(() => {
          setEnabledButton(!enabledButton);
        }).catch((e) => alert(`No se pudo actualizar la habitación: ${ e}`));
        
    };
    useEffect(() => {
      dispatch(getAllRooms());
  }, [enabledButton]);
    useEffect(() => {
      dispatch(getAllRooms());
  }, [dispatch]);
  
  return (
    <div className="min-w-[500px] min-h-[300px] w-full  flex flex-col items-center justify-start ">
      <div className="flex flex-col w-11/12 bg-[#2f2e2e] border-2 rounded-xl min-h-[300px] px-6 py-4 gap-4 ">
        <div className="flex flex-row items-center justify-between">
          <p className="text-white text-xl">Habitaciones</p>
          <Link to="/admin/dashboard/createroom">
          <IoMdAddCircle className="h-8 w-8 cursor-pointer text-black hover:scale-110 hover:text-zinc-400 duration-300" />
          </Link>
        </div>

        {rooms.length ?
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
              handleEnable={handleEnable}

            />
            </div>
          )) : loading ? (
            <div className="text-black pt-36 mt-36 items-center justify-center text-center">
            <svg
              className="animate-spin h-5 w-5 m-auto bg-red-500 "
              viewBox="0 0 24 24"
            ></svg>
            <h2>Cargando...</h2>
          </div>
          ) : <div><h2>No se encontraron habitaciones</h2></div>
        }
      </div>
    </div>
  );
};

export default RoomsTable;
