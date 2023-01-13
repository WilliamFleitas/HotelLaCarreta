import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useParams } from "react-router-dom";
import { getRoomId } from "../../redux/slices/RoomSlice/RoomAction";
import { FaConciergeBell } from "react-icons/fa";

export const RoomDetail = () => {
  const { id } = useParams();
  const room = useAppSelector((state) => state.rooms.roomDetail);
  const { loading, error } = useAppSelector((state) => state.rooms);
  console.log("romdetail2", room);
  const dispatch = useAppDispatch();



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
      window.location.replace("http://127.0.0.1:5173/");
    } else {
      dispatch(getRoomId(String(id)));
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
    console.log(error);

    window.location.replace("http://127.0.0.1:5173/");
  }

  return (
    <div className="pt-5  p-5 items-center text-center justify-center">
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
                    <div  key={`${index}_currentimg${image}`}>
                      <img className="border-2 border-[#B35642] h-[225px] w-screen rounded-lg" src={image} alt={image}/>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <></>
          )}
            {/* slideparaimagenes */}
            <div className="grid-cols-5  p-5 pt-5 grid gap-5 grid-rows-1 items-center justify-center"> 
          { room.images.length > 0 ? room.images.map((image, index) => {
          return (
            <div key={`${image}_slide${index}`} onClick={() => goToSlide(index)} className="">
              {currentImg === index  ? (
                <div className="opacity-[100%]" key={`${image}_slideImg${index}`}>
                  <img className="rounded-lg border-2 border-black h-[35px] w-[50px]" src={image} alt={image}/>
                </div>
              ) : (
                <div className="opacity-[40%]" key={`${image}_slideImgopacity${index}`}>
                  <img className="rounded-lg border-2 border-[#B35642] h-[28px] w-[40px]" src={image} alt={image}/>
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
  );
};
