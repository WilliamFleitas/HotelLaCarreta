import React, { useEffect, useRef, useState, MutableRefObject } from "react";
import { RoomCard } from "./RoomCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllRooms } from "../../redux/slices/RoomSlice/RoomAction";

export const RoomCarrusel = () => {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector((state) => state.rooms.roomList);

  let myInterval: ReturnType<typeof setInterval> | undefined;
  
  let [currentImg, setCurrentImg] = useState(0);
  const quantity = rooms.length -1;

  // const nextImg = () => {
    
  //   setCurrentImg(currentImg === quantity ? 0 : currentImg +1);
  //   clearInterval(myInterval);
  // };
  // const prevImg = () => {
  //   clearInterval(myInterval);
  //   setCurrentImg(currentImg === 0 ? quantity - 1 : currentImg - 1);
  // };

  const goToSlide = (index?: number) => {
    console.log(index);
    if(!index){
      setCurrentImg(currentImg === quantity ? 0 : currentImg +1);
    clearInterval(myInterval);
    }else{
      clearInterval(myInterval);
      setCurrentImg(index);
    }
    
  };
  // let interval = 
  useEffect(() => {
    clearInterval(myInterval);
    myInterval = setInterval(goToSlide, 18000);
  }, [currentImg]);

  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);
  return (
    <div className="text-black text-center pt-10 flex flex-col">
      <h2 className=" m-2 h-[40px] p-2 rounded-lg text-[#B35642] text-[20px] ">Elegi tu habitacion deseada!</h2>
      <div className="flex flex-row justify-center pt-5 space-x-5 pb-5">
        
        {rooms.map((room, index) => {
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
        })}
      </div>

      {rooms.length ? (
        rooms.map((rooms, index) => {
          
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
          <p>No se encontraron productos</p>
        </div>
      )}
      
      <div className=" flex justify-center pt-5">
        <button className="text-white bg-[#B35642]  p-1 flex w-[100px] justify-center rounded-lg border-2 border-[#D3B616]">VER MÁS</button>
      </div>
    </div>
  );
};
