import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { RoomsDetails } from "../../redux/slices/RoomSlice";
import {
  getAllRooms,
  getFilteredReservations,
} from "../../redux/slices/RoomSlice/RoomAction";
import dayjs from "dayjs";
import ReservationsAllRow from "./ReservationsAllRow";

import ReservationsRow from "./ReservationsRow";

const ReservationsTable = () => {
  const rooms = useAppSelector((state) => state.rooms.roomList);
  const loading = useAppSelector((state) => state.rooms.loading);
  const filteredRes = useAppSelector(
    (state) => state.rooms.filteredReservations
  );
  const filterRooms = rooms.filter((e) => e.Reservations.length > 0);

  const [bookingSwitch, setBookingswitch] = useState();
  const dispatch = useAppDispatch();

  const [panelSwitch, setPanelSwitch] = useState(false);
  const [resButton, setResbutton] = useState(false);
  const [allButton, setAllButton] = useState(false);

  const handleSwitch = (item: string) => {
    switch (item) {
      case "reservation":
        setPanelSwitch(false);
        setResbutton(true);
        setAllButton(false);

        break;
      case "all":
        setPanelSwitch(true);
        setAllButton(true);
        setResbutton(false);
        break;
      default:
        setPanelSwitch(false);
        setResbutton(true);
        setAllButton(false);
    }
  };

  useEffect(() => {
    dispatch(getAllRooms());
    dispatch(getFilteredReservations());
  }, [dispatch]);
  return (
    <>
      <div className="min-w-[500px] w-full h-full  flex flex-col items-center justify-center pb-10">
        <div className="flex flex-col w-11/12 bg-[#2f2e2e] border-x-2   h-full ">
          <div className="flex flex-row m-auto  gap-5 bg-[#2f2e2e] rounded-lg p-2 ">
            <button
              className={`border-2 shadow-sm shadow-white rounded-lg px-2 hover:bg-[#4a4949] hover:shadow-sm  hover:shadow-white ${!panelSwitch ? "shadow-sm shadow-white bg-[#4a4949]": ""}`}
              onClick={() => handleSwitch("reservation")}
              disabled={resButton}
            >
              Reservas cercanas
            </button>
            <button
              className={`border-2  shadow-sm shadow-white rounded-lg px-2 hover:bg-[#4a4949] hover:shadow-sm  hover:shadow-white ${panelSwitch ? "shadow-sm shadow-white bg-[#4a4949]": ""}`}
              onClick={() => handleSwitch("all")}
              disabled={allButton}
            >
              Todas las reservas
            </button>
          </div>
        </div>

        {!panelSwitch ? (
          <div className="flex flex-col w-11/12 bg-[#2f2e2e] border-x-2 border-b-2 rounded-xl rounded-t-none h-full px-6 py-4">
            <p className="text-white text-xl">Reservas cercanas a la fecha {dayjs().format("YYYY/MM/DD")}:</p>
            { filteredRes.length ? (
              filteredRes?.map((res: any) => {
                const roomRes = rooms?.find((e) => e.id === res.RoomId);

                return (
                  <div
                    className="text-center items-center justify-center "
                    key={res.id.toString()}
                  >
                    <div>
                      <ReservationsRow
                        id={res.id}
                        reservation={res}
                        room={roomRes as RoomsDetails}
                      />
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
              <div>No se encontraron reservaciones cercanas</div>
            )}
          </div>
        ) : (
          <></>
        )}

        {panelSwitch ? (
          <div className="flex flex-col w-11/12 bg-[#2f2e2e] border-x-2 border-b-2 rounded-xl rounded-t-none h-full px-6 py-4">
            <p className="text-white text-xl">Todas las reservas desde la creación:</p>

            {filterRooms.length ? (
              filterRooms?.map((res: any) => {
                return (
                  <div
                    className="text-center items-center justify-center "
                    key={res.id.toString()}
                  >
                    <div>
                      <ReservationsAllRow
                        id={res.id}
                        reservation={res.Reservations}
                        room={res}
                      />
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
              <div><h2>No se encontraron habitaciones</h2></div>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ReservationsTable;
