import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useParams } from "react-router-dom";
import { getRoomId } from "../../../redux/slices/RoomSlice/RoomAction";
import { FaConciergeBell } from "react-icons/fa";
import useWindowSize from "../../customHooks/useWindowSize";
import { RoomDetailCarrusel } from "./RoomDetailCarrusel";
import { CheckRoom } from "../check/CheckRoom";

export const RoomDetail = () => {
  const { id } = useParams();
  const room = useAppSelector((state) => state.rooms.roomDetail);
  const { loading, error } = useAppSelector((state) => state.rooms);
  const dispatch = useAppDispatch();
  const {width} = useWindowSize();
  const urlBack: string = (import.meta.env.VITE_BACK_URL as string);

  let [currentImg, setCurrentImg] = useState(0);
  const quantity = room.images.length;

  const goToSlide = (index: number) => {
      setCurrentImg(index);
  };

  useEffect(() => {
  }, [currentImg]);

  useEffect(() => {
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(
        String(id)
      )
    ) {
      alert("No se encontro la habitación");
      window.location.replace(`/home`);
    } else {
      dispatch(getRoomId(id as string) as any);
    }
  }, [dispatch, id]);
  if (loading) {
    return (
      <div>
        <h2>Cargando...</h2>
      </div>
    );
  }
  if (error) {
    alert(error);
    window.location.replace(`/home`);
  }

  return (<div>
    {
      width < 768 ? <div className="pt-5  p-5 items-center text-center justify-center cdw:pt-10 ccc:pt-14 tsw:pt-10">
      {room.name || room.id ? (
        <div className="text-[#B35642] pt-2">
          <div className="pb-5">
            <label className=" text-[30px]">Habitación</label>
          </div>
          {/* mapeadodeimagenes */}
          {room.images.length > 0 ? (
            room.images.map((image, index) => {
              return (
                <div  key={`${image}_room${index}`}>
                  {currentImg === index && (
                    <div className="cst:p-10 qn:p-16 sm:p-24" key={`${index}_currentimg${image}`}>
                      <img className="border-2 border-[#B35642] h-[225px]  w-screen rounded-lg qn:h-[250px] sm:h-[270]" src={image} alt={image}/>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <>No se encontraron imagenes</>
          )}
            {/* slideparaimagenes */}
            <div className="grid-cols-5  p-5 pt-5 grid gap-5 grid-rows-1 items-center justify-center"> 
          { room.images.length > 0 ? room.images.map((image, index) => {
          return (
            <div key={`${image}_slide${index}`} onClick={() => goToSlide(index)} className="">
              {currentImg === index  ? (
                <div className="opacity-[100%]" key={`${image}_slideImg${index}`}>
                  <img className="rounded-lg border-2 border-black h-[35px] w-[50px] qn:h-[55px] qn:w-[75px]" src={image} alt={image}/>
                </div>
              ) : (
                <div className="opacity-[40%]" key={`${image}_slideImgopacity${index}`}>
                  <img className="rounded-lg border-2 border-[#B35642] h-[28px] w-[40px] qn:h-[50px] qn:w-[70px]" src={image} alt={image}/>
                </div>
              )}
            </div>
          );
        }): <></>
      }
            </div>
          <h2 className="pb-5 text-[24px]">{room.name}</h2>
          <div className="text-start pb-4 text-black">
            <h4>● capacity: {room?.capacity}.</h4>
            <h4>● precio: {room?.price}.</h4>
            <h3>● Zona de la habitación: {room.roomZone}.</h3>
            <p>● {room.preDescription}.</p>
          </div>

          <div className="pt-2 pb-5 text-black">
            <p>{room.description}</p>
          </div>

          <label className="text-[20px]">
            Caracteristicas de la habitación
          </label>
          <div className="text-start pb-5 pt-2 text-black">
            {room.room_features.length ? (
              room.room_features.map((e) => {
                return <p key={e}>● {e}.</p>;
              })
            ) : (
              <></>
            )}
          </div>

          <label className="text-[20px]">Caracteristicas del baño</label>
          <div className="text-start pb-5 pt-2 text-black">
            {room.bathroom_features.length ? (
              room.bathroom_features.map((e) => {
                return <p key={e}>● {e}.</p>;
              })
            ) : (
              <></>
            )}
          </div>

          <label className="text-[20px]">Servicios de la habitación</label>
          <div className="grid grid-cols-2 text-black  text-start pr-5">
            {room.room_services.length ? (
              room.room_services.slice(0, 2).map((e) => {
                return (
                  <div
                    key={e}
                    className="flex justify-start flex-col items-center pt-4"
                  >
                    <div className=" h-[150px] justify-start flex-col flex items-center">
                      <FaConciergeBell className="text-[30px]  text-black " />

                      <p className="text-center">{e}</p>
                    </div>
                  </div>
                );
              })
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>no se encontraron productos</p>{" "}
        </div>
      )}
    </div> 
    : 
    // estosemuestrasieslmayor a 768
    <div className="pt-24 text-center xl:p-5 xl:pt-16 ">
      {room.name || room.id ? (
        <div className="text-[#E2725B] ">
            <label className=" text-[45px]">Habitación</label>
          <div className="grid pt-12 grid-cols-2 gap-6 p-10 h-full">
          {/* mapeadodeimagenes */}
          <div className=""> 
          {room.images.length > 0 ? (
            room.images.map((image, index) => {
              return (
                <div  key={`${image}_room${index}`}>
                  {currentImg === index && (
                    <div className="h-full" key={`${index}_currentimg${image}`}>
                      <img className="h-[250px] w-screen rounded-lg border-2 shadow-lg shadow-zinc-500 border-[#E2725B] aser:h-[280px] lg:h-[300px] xl:h-[350px]" src={image} alt={image}/>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <>No se encontraron imagenes</>
          )}
            {/* slideparaimagenes */}
            <div className="grid-cols-5  p-5 pt-5 grid gap-5 grid-rows-1 items-center justify-center"> 
          { room.images.length > 0 ? room.images.map((image, index) => {
          return (
            <div key={`${image}_slide${index}`} onClick={() => goToSlide(index)} className="">
              {currentImg === index  ? (
                <div className="opacity-[100%]" key={`${image}_slideImg${index}`}>
                  <img className="rounded-lg border-2 border-black h-[35px] w-[50px] qn:h-[55px] qn:w-[75px]" src={image} alt={image}/>
                </div>
              ) : (
                <div className="opacity-[40%]" key={`${image}_slideImgopacity${index}`}>
                  <img className="rounded-lg border-2 border-[#B35642] h-[28px] w-[40px] qn:h-[50px] qn:w-[70px]" src={image} alt={image}/>
                </div>
              )}
            </div>
          );
        }): <></>
      }
      </div>
            </div>
            <div className="text-start  pb-4 text-black">
          <h2 className="pb-5 text-[32px] text-[#E2725B] text-center lg:text-[38px] lg:pb-8 xl:text-[42px]">{room.name}</h2>
          <div className="text-[24px] leading-8 lg:text-[28px] lg:leading-[40px] xl:leading-[48px] xl:text-[32px]">
            <h4>- capacity: {room?.capacity}.</h4>
            <h4>- precio: {room?.price}.</h4>
            <h3>- Zona de la habitación: {room.roomZone}.</h3>
            <p>- {room.preDescription}.</p>
          </div>

          <div className="text-[24px] leading-6 pt-4 text-center lg:pt-8 lg:text-[28px] xl:text-[32px]">
            <p>{room.description}</p>
          </div>
            </div>

          </div>

            <div className="p-8">
                <h3 className="text-[35px] text-[#E2725B] text-center pb-5 lg:text-[40px]xl:text-[42px] ">Comodidades de la habitación</h3>
          <div className="grid grid-cols-3  text-black text-center  p-5 space-x-8 h-full">


            <div >
          <label className="text-[#E2725B] text-[26px] text-center xl:text-[28px]">
            Caracteristicas de la habitación
          </label>
          <div className=" text-start text-[19px] pt-4 xl:text-[22px]">
            {room.room_features.length ? (
              room.room_features.map((e) => {
                return <p key={e}>- {e}.</p>;
              })
            ) : (
              <></>
            )}
          </div>

          </div>

          <div>
          <label className="text-[#E2725B] text-[26px] text-center xl:text-[28px]">Caracteristicas del baño</label>
          <div className=" text-start text-[19px] pt-4 xl:text-[22px]">
            {room.room_features.length ? (
              room.room_features.map((e) => {
                return <p key={e}>- {e}.</p>;
              })
            ) : (
              <></>
            )}
          </div>

          </div>

          <div>
          <label className="text-[#E2725B] text-[26px] text-center xl:text-[28px]">Servicios de la habitación</label>
          <div className=" text-start text-[19px] pt-4 xl:text-[22px]">
            {room.room_services.length ? (
              room.room_services.map((e) => {
                return <p key={e}>- {e}.</p>;
              })
            ) : (
              <></>
            )}
          </div>

          </div>


          </div>
        </div>
        </div>
      ) : (
        <div>
          <p>no se encontraron productos</p>{" "}
        </div>
      )}
      <CheckRoom roomId={id} reserved={room.Reservations} price={room.price} roomName={room.name}/>
      <RoomDetailCarrusel/>
    </div>

    }
  </div>
    
  );
};
