import React, {useEffect} from "react";
import { RoomCard } from "./RoomCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllRooms } from "../../redux/slices/RoomSlice/RoomAction";


export const RoomCards = () => {

    const rooms = useAppSelector((state) => state.rooms.roomList);
    console.log("roomss", rooms);
    console.log("roomss2", rooms);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);
    return (
        <div className="text-black text-center pt-10">
          
           {rooms.length ? 
          rooms.map((rooms, index) => {
            return (
            <div className="h-[600px]">
              <RoomCard key={rooms.id} rooms={rooms}  />
            </div>)
          })
         : 
          <div>
            <p>No se encontraron productos</p>
          </div>
        }
            
        </div>
    )
};