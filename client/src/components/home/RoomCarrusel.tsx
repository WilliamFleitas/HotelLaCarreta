import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import { RoomCard } from "./RoomCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllRooms } from "../../redux/slices/RoomSlice/RoomAction";
import useWindowSize from "../customHooks/useWindowSize";
import { Link } from "react-router-dom";

export const RoomCarrusel = () => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.rooms.roomList);
  const {width} = useWindowSize();
  let myInterval: ReturnType<typeof setInterval> | undefined;
  
  let [currentImg, setCurrentImg] = useState(0);
  const quantity = rooms.length -1;

  const nextImg = () => {
    clearInterval(myInterval);
    setCurrentImg(currentImg === quantity ? 0 : currentImg + 1);
  };

  const goToSlide = (index: number) => {
      clearInterval(myInterval);
      setCurrentImg(index);
  };

  useEffect(() => {
    clearInterval(myInterval);
    myInterval = setInterval(nextImg, 18000);
  }, [currentImg]);

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);
  return (  
  <div className="overflow-x-hidden">
    {
      width < 768 ? 
      <div className="text-black text-center pt-5 flex flex-col tcw:pt-10 tsw:pt-12 cvo:pt-12">
      <h2 className=" m-2 h-[40px] p-2 rounded-lg text-[#B35642] text-[20px] tcw:pb-14 tsw:pb-0">Elegi tu habitacion deseada!</h2>
      <div className="flex flex-row justify-center pt-5 space-x-5 pb-5 tsw:pt-0">
          {/* slidemap */}
        { typeof rooms === "object" && rooms.length > 0 ? rooms.slice(0, 6).map((room, index) => {
          return (
            <div key={room.id} onClick={() => goToSlide(index)} className="text-[30px] ">
              {currentImg === index  ? (
                <div className="opacity-[100%]">
                  <nav>
                    <ul>
                      <li>●</li>
                    </ul>
                  </nav>
                </div>
              ) : (
                <div className="opacity-[30%]">
                  <nav>
                    <ul>
                      <li>●</li>
                    </ul>
                  </nav>
                </div>
              )}
            </div>
          );
        }): <></>
      }
      </div>
        {/* carruselmap */}
      {typeof rooms === "object" && rooms.length > 0 ? (
        rooms.slice(0, 6).map((rooms, index) => {
          
          return (
            <div key={rooms.id}>
              {currentImg === index && (
                <div>
                  <RoomCard key={rooms.id} rooms={rooms} />
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div>
          <p>No se encontraron habitaciones</p>
        </div>
      )}
      
      <div className=" flex justify-center pt-5 ">
        <Link to="/rooms">
        <button className="text-white bg-[#B35642]  p-1 flex w-[100px] justify-center rounded-lg border-2 border-[#D3B616] hover:bg-[#c25f48] hover:border-[#7a6a10]">VER MÁS</button>
        </Link>
      </div>
    </div> 
    : 
    // tabletaresponsive
    <div className="text-[#696969] justify-center items-center text-center p-5 py-5 leading-[25px]	">
      <div className="p-5 lgg:p-10">
      <h2 className="text-[40px] py-5 text-[#E2725B]">Habitaciones</h2>
      <p className="text-[20px] ">Las habitaciones de la posada cuentan con todo lo que necesitas para relajarte de la forma más placentera durante su estadía en el campo, Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque ad voluptatum unde distinctio.</p>
      </div>

      <div className={typeof rooms === "object" && rooms.length > 0 ? ` grid grid-cols-2 lg:grid-cols-3 p-5 py-10 text-center items-center justify-center lg:p-2 lg:w-screen lgg:p-8 lgg:w-full` : `  p-5 py-10 text-center items-center justify-center lg:p-2 lg:w-screen lgg:p-8 lgg:w-full` }>
      {typeof rooms === "object" && rooms.length > 0 ? (
        rooms.slice(0,6).map((rooms, index) => {
          return (
            <div className="px-10 text-center pb-14 lg:px-5 lg:text-start" key={rooms.id}>
              <img className="h-[200px] w-[260px] border border-[#E2725B] rounded-lg aser:w-screen aser:h-full" src={rooms.images?.[0]} alt={rooms.images?.[0]}/>
              <h2 className="text-[#E2725B] pt-3 text-[25px] pb-3">{rooms.name}</h2> 
              <div className=" pt-3  grid grid-cols-2 gap">
               <h3 className=" text-[20px] pb-3 gap text-center ">●Zona: {rooms.roomZone}</h3>
               <h3 className=" text-[20px] pb-3 gap text-center ">●Precio: <b className="text-[#E2725B]">{rooms.price}GS.</b></h3>
              </div>
              <Link to={`/roomdetail/${rooms.id}`}>
                
              <button className="text-white  rounded-lg bg-[#B35642] p-2 px-5 hover:bg-opacity-[80%] shadow-md shadow-[#ee7256]"> RESERVAR ➜</button>
              
              </Link>
            </div>
          
          )
        })
      ) : (
        
        <div className=" text-[20px] ">
          <p className="">No se encontraron habitaciones...</p>
        </div>
      )}
       </div>
      </div>
    }
  </div>
    
  );
};
