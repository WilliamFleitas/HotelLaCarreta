import React, {useEffect} from "react";
import { RoomCard } from "./RoomCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllRooms } from "../../redux/slices/RoomSlice/RoomAction";
import { Check } from "./Check";


export const RoomCards = () => {

    const rooms = useAppSelector((state) => state.rooms.roomList);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);
    return (
        <div className=" text-center pt-10  flex flex-col justify-center ">
           <h2 className="text-[#B35642] text-[24px] p-5">¡Vea nuestras habitaciones!</h2>
           <Check/>
           <h2 className="text-[#B35642] pt-16 text-[20px]">Habitaciones disponibles</h2>
           <div className="flex flex-col items-center justify-center pt-16  pb-15 ">
           {rooms.length ? 
          rooms.map((rooms, index) => {
            return (
            <div className="h-full pb-16">
              <RoomCard key={rooms.id} rooms={rooms}  />
            </div>)
          })
         : 
          <div>
            <p>No se encontraron productos</p>
          </div>
        }
         </div>   
        </div>
    )
};