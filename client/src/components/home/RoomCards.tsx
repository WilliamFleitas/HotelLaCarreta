import React, {useEffect} from "react";
import { RoomCard } from "./RoomCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllRooms } from "../../redux/slices/RoomSlice/RoomAction";
import { Check } from "./Check";
import useWindowSize from "../customHooks/useWindowSize";


export const RoomCards = () => {

    const { width } = useWindowSize();
    const rooms = useAppSelector((state) => state.rooms.roomList);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllRooms());
    }, [dispatch]);
    return (
        <div>
      {
        width < 768 ?  <div className=" text-center pt-10  flex flex-col justify-center ">
        <h2 className="text-[#B35642] text-[24px] p-5">¡Vea nuestras habitaciones!</h2>
        <Check/>
        <h2 className="text-[#B35642] pt-16 text-[20px]">Habitaciones disponibles</h2>
        <div className="flex flex-col items-center justify-center pt-16  pb-15 ">
        {typeof rooms === "object" && rooms.length > 0 ? 
       rooms.map((rooms, index) => {
         return (
         <div className="h-full pb-16">
           <RoomCard key={rooms.id} rooms={rooms}  />
         </div>)
       })
      : 
       <div className="text-black">
         <p>No se encontraron productos</p>
       </div>
     }
      </div>   
     </div>
      :
      <div className="text-[#696969] justify-center items-center text-center py-12 leading-[25px]	">
      <div className="">
      <div className="items-center justify-center text-center">
      <div className="bg-[#B35642] h-[18vh] w-full pt-5 text-white ">
        <h3>Check in y check out aca</h3>
      </div>
      </div>
      </div>

      <h2 className="text-[40px] py-10 text-[#E2725B]">Vea nuestras habitaciones!</h2>
      <div className={typeof rooms === "object" && rooms.length > 0 ? ` grid grid-cols-2 lg:grid-cols-3 p-5 py-10 text-center items-center justify-center lg:p-2 lg:w-screen lgg:p-8 lgg:w-full` : `p-5 py-10 text-center items-center justify-center lg:p-2 lg:w-screen lgg:p-8 lgg:w-full`}>
      {typeof rooms === "object" && rooms.length > 0 ? (
        rooms.map((rooms, index) => {
          return (
            <div className="px-10 text-center pb-14 lg:px-5 lg:text-start" key={rooms.id}>
              <img className="h-[200px] w-[260px] border border-[#E2725B] rounded-lg aser:w-screen aser:h-full" src={rooms.images?.[0]} alt={rooms.images?.[0]}/>
              <h2 className="text-[#E2725B] pt-3 text-[25px] pb-3">{rooms.name}</h2> 
              <div className=" pt-3  grid grid-cols-2 gap">
               <h3 className=" text-[20px] pb-3 gap text-center ">●Zona: {rooms.roomZone}</h3>
               <h3 className=" text-[20px] pb-3 gap text-center ">●Precio: <b className="text-[#E2725B]">{rooms.price}GS.</b></h3>
              </div>
              <p className="text-[20px] text-center pb-3">{rooms.preDescription}</p>
              <button className="text-white  rounded-lg bg-[#B35642] p-2 px-5"> RESERVAR ➜</button>
            
            </div>
          
          )
        })
      ) : (
        <div className="">
          
          <p className=" text-[20px]">No se encontraron habitaciones...</p>
       
        </div>
      )}
       </div>
      </div>
      }
      </div>  
    )
};