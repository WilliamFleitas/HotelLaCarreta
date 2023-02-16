import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllRooms, getFilteredReservations } from "../../redux/slices/RoomSlice/RoomAction";
import { ReservationType } from "../../types/Reservation";


import ReservationsRow from "./ReservationsRow";

const ReservationsTable = () => {
  const rooms = useAppSelector((state) => state.rooms.roomList);
  const filteredRes = useAppSelector((state) => state.rooms.filteredReservations);
  console.log("filterss", filteredRes)

  const filterRooms = rooms.filter((e) => e.Reservations.length > 0);
  console.log("filter", filterRooms);
  
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(getAllRooms());
    dispatch(getFilteredReservations());
  }, [dispatch]);
  return (
    <>
      <div className="w-full h-full bg-[#928282] flex flex-col items-center justify-center pt-10 pb-10">
        <div className="flex flex-col w-11/12 bg-[#2f2e2e] border-2 rounded-xl h-full px-6 py-4">
          <p className="text-white text-xl">Reservas</p>
          
          {filterRooms.map((room: any) => (
            <div className="text-center items-center justify-center " key={room.id.toString()}>
              

              <div>
            <ReservationsRow
              id={room.id}
              reservation={room.Reservations}
              room={room}
            /> 
            
            </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReservationsTable;
