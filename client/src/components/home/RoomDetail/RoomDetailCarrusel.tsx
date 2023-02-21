import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getHigherPrice } from "../../../redux/slices/RoomSlice/RoomAction";

export const RoomDetailCarrusel = () => {

    const rooms = useAppSelector((state) => state.rooms.higherPriceRoomList);
    const loading = useAppSelector((state) => state.rooms.loadingDetail);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getHigherPrice());
    }, [dispatch]);


    return (
        <div className="text-black">
            <h3 className="text-[35px] text-[#E2725B] text-center pb-5 lg:text-[40px]xl:text-[42px] ">Otras habitaciones</h3>
           <div className={` grid grid-cols-3 lg:grid-cols-3 p-5 py-10 text-center items-center justify-center lg:p-2 lg:w-screen lgg:p-8 lgg:w-full`}>
      {typeof rooms === "object" && rooms.length > 0 ? (
        rooms.slice(0, 3).map((rooms, index) => {
          return (
            <div className="px-10 text-start pb-14 lg:px-5 lg:text-start h-[300px]" key={rooms.id}>
              <img className="h-[200px] w-[260px] border border-[#E2725B] rounded-lg aser:w-screen aser:h-full" src={rooms.images?.[0]} alt={rooms.images?.[0]}/>
              <h2 className="text-[#E2725B] pt-3 text-[25px] pb-3">{rooms.name}</h2> 
              <div className=" pt-3  grid grid-cols-2 gap">
               <h3 className=" text-[20px] pb-3 gap text-center ">●Zona: {rooms.roomZone}</h3>
               <h3 className=" text-[20px] pb-3 gap text-center ">●Precio: <b className="text-[#E2725B]">{rooms.price}GS.</b></h3>
              </div>
              <Link to={`/roomdetail/${rooms.id}`}>
                
              <button className="text-white pt-  rounded-lg bg-[#B35642] p-2 px-5 hover:bg-opacity-[80%]"> RESERVAR ➜</button>
              
              </Link>
            
            </div>
          
          )
        })
      ) : loading ?  <div className="text-black pt-36">
      <h2>cargando..</h2>
    </div> : (
        <div className="absolute text-center items-center justify-center aling-center text-[20px] right-[250px]">
          
          <p className=" ">No se encontraron habitaciones...</p>
       
        </div>
      )}
       </div> 
       <Link to="/rooms">
       <button className="text-white mt-36  rounded-lg bg-[#B35642] p-2 px-5  border-[#D3B616] hover:bg-[#c25f48] hover:border-[#7a6a10]"> VER MÁS ➜</button>
       </Link>
        </div>
    )
};