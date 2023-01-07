import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateData } from "../../redux/adminSlice";
import { AppDispatch, RootState } from "../../redux/store";

const NavbarAdmin = () => {
  const current = useSelector((state: RootState) => state.admin.current);
  const dispatch: AppDispatch = useDispatch();
  return (
    <div className="h-12 w-full bg-white flex flex-row items-center px-4 justify-between ">
      <p className="font-bold text-xl">ADMIN</p>
      <div className="flex flex-row gap-4">
        <button
          className={`cursor-pointer ${
            current === "habitaciones" && "font-bold border-b-2 border-black"
          }`}
          onClick={() => {
            dispatch(updateData("habitaciones"));
          }}
        >
          Habitaciones
        </button>
        <button
          className={`cursor-pointer ${
            current === "reservas" && "font-bold border-b-2 border-black"
          }`}
          onClick={() => {
            dispatch(updateData("reservas"));
          }}
        >
          Reservas
        </button>
        <button
          className={`cursor-pointer ${
            current === "productos" && "font-bold border-b-2 border-black"
          }`}
          onClick={() => {
            dispatch(updateData("productos"));
          }}
        >
          Productos
        </button>
      </div>
    </div>
  );
};

export default NavbarAdmin;
