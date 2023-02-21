import React, { useEffect } from "react";
import { RoomCard } from "./RoomCard";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllRooms } from "../../redux/slices/RoomSlice/RoomAction";
import useWindowSize from "../customHooks/useWindowSize";
import { Link } from "react-router-dom";
import { CheckFilter } from "./CheckFilter";

export const RoomCards = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowSize();
  const rooms = useAppSelector((state) => state.rooms.roomList);
  const loading = useAppSelector((state) => state.rooms.loading);
  console.log(loading);
  useEffect(() => {
    dispatch(getAllRooms());
  }, [dispatch]);

  return (
    <div>
      {width < 768 ? (
        <div className=" text-center pt-10  flex flex-col justify-center ">
          <h2 className="text-[#B35642] text-[24px] p-5">
            ¡Vea nuestras habitaciones!
          </h2>
          <CheckFilter />
          <h2 className="text-[#B35642] pt-16 text-[20px]">
            Habitaciones disponibles
          </h2>
          <div className="flex flex-col items-center justify-center pt-16  pb-15 ">
            {typeof rooms === "object" && rooms.length > 0 ? (
              rooms.map((rooms, index) => {
                return (
                  <div className="h-full pb-16" key={rooms.id}>
                    <RoomCard key={rooms.id} rooms={rooms} />
                  </div>
                );
              })
            ) : loading ? (
              <div className="text-black pt-36 mt-36 flex flex-row">
                <svg
                  className="animate-spin h-5 w-5 mr-3 bg-red-500 "
                  viewBox="0 0 24 24"
                ></svg>
                <h2>Cargando...</h2>
              </div>
            ) : (
              <div className="text-black">
                <p>No se encontraron habitaciones</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="text-[#4e4c4c] justify-center items-center text-center py-20 leading-[25px]	">
          <h2 className="text-[40px] py-10 text-[#E2725B]">
            Vea nuestras habitaciones!
          </h2>

          <CheckFilter />

          <div
            className={
              typeof rooms === "object" && rooms.length > 0
                ? `md:w-full md:pt-10 md:h-full grid grid-cols-2 lg:grid-cols-3 p-5 py-10 text-center items-center justify-center lg:p-2 lg:pt-14 lgg:p-8 `
                : `p-5 py-10 text-center items-center justify-center lg:p-2 lg:w-screen lgg:p-8 lgg:w-full`
            }
          >
            {typeof rooms === "object" && rooms.length > 0 ? (
              rooms.map((rooms, index) => {
                return (
                  <div
                    className="px-10 pb-14 lg:px-5 lg:text-start md:w-full md:h-full"
                    key={rooms.id}
                    data-aos="flip-left"
                    data-aos-duration="2000"
                  >
                    <img
                      className="h-[200px] w-screen border border-[#E2725B] rounded-lg m-auto shadow-lg shadow-black"
                      src={rooms.images?.[0]}
                      alt={rooms.images?.[0]}
                    />
                    <h2 className="text-[#E2725B] pt-8 text-[25px] text-center pb-3">
                      {rooms.name}
                    </h2>
                    <div className=" pt-3 ">
                      <h3 className=" text-[20px] pb-3 gap text-start">
                        ●Zona: {rooms.roomZone}
                      </h3>
                      <h3 className=" text-[20px] pb-3 gap text-start ">
                        ●Precio:{" "}
                        <b className="text-[#E2725B]">{rooms.price}GS.</b>
                      </h3>
                    </div>
                    <p className="text-[20px] text-start pb-3">
                      {rooms.preDescription}
                    </p>
                    <div className="flex m-auto text-start items-start justify-start ">
                      <Link to={`/roomdetail/${rooms.id}`}>
                        <button className="text-white border  rounded-lg bg-[#B35642] p-2 px-5 md:p hover:bg-opacity-[80%] shadow-lg shadow-black ">
                          {" "}
                          RESERVAR ➜
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : loading ? (
              <div className="text-black pt-36 mt-36 items-center justify-center text-center">
                <svg
                  className="animate-spin h-5 w-5 m-auto bg-red-500 "
                  viewBox="0 0 24 24"
                ></svg>
                <h2>Cargando...</h2>
              </div>
            ) : (
              <div className="text-black">
                <p>No se encontraron habitaciones</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
