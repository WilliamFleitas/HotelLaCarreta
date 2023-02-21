import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useWindowSize from "../customHooks/useWindowSize";
import { FacilitiesTable } from "./FacilitiesTable";
import { GalleryTable } from "./GalleryTable";
import ProductsTable from "./ProductsTable";
import ReservationsTable from "./ReservationsTable";
import RoomsTable from "./RoomsTable";

const AdminPanel = () => {
   const navigate = useNavigate()

   const [actualPanel, setActualPanel] = useState<string>("room");
   const [panelSwitch, setPanelSwitch] = useState<boolean>(true);
   const [resButton, setResbutton] = useState<boolean>(false);
   const [roomButton, setRoomButton] = useState<boolean>(false);
   const { width } = useWindowSize();

   const handleSwitch = (item: string) => {

      setActualPanel(item);
   };

   const handleLogOut = () => {
      localStorage.removeItem("userSession");
      navigate("/");
   };

  return (
   <>
   { width > 768 ? <div className="pt-20">
      <div className="text-end">
      <button className="border-2 border-red-300 z-50 mt-14 p-1 text-[#E2725B]  rounded-lg shadow-md shadow-red-300 " onClick={() => handleLogOut()}>Cerrar session</button>
      </div>
    <div className=" shadow-md border-2 mt-4  shadow-white  relative bg-[#928282] rounded-xl pb-14">
      
      <div className="text-center flex flex-row justify-center items-center gap-5 p-2 bg-[#2f2e2e] border-2 rounded-xl ">
        <button className={`border-2 shadow-sm shadow-white rounded-md px-2 hover:bg-[#4a4949] hover:shadow-sm  hover:shadow-white ${actualPanel === "room" ? "shadow-sm shadow-white bg-[#4a4949]": ""}`} onClick={() => handleSwitch("room")} disabled={actualPanel === "room" && true}>Habitaciones</button>
        <button className={`border-2 shadow-sm shadow-white rounded-md px-2 hover:bg-[#4a4949] hover:shadow-sm  hover:shadow-white ${actualPanel === "reservation" ? "shadow-sm shadow-white bg-[#4a4949]": ""}`} onClick={() => handleSwitch("reservation")} disabled={actualPanel === "reservation" && true}>Reservas</button>
        <button className={`border-2 shadow-sm shadow-white rounded-md px-2 hover:bg-[#4a4949] hover:shadow-sm  hover:shadow-white ${actualPanel === "facilities" ? "shadow-sm shadow-white bg-[#4a4949]": ""}`} onClick={() => handleSwitch("facilities")} disabled={actualPanel === "facilities" && true} >Instalaciones</button>
        <button className={`border-2 shadow-sm shadow-white rounded-md px-2 hover:bg-[#4a4949] hover:shadow-sm  hover:shadow-white ${actualPanel === "gallery" ? "shadow-sm shadow-white bg-[#4a4949]": ""}`} onClick={() => handleSwitch("gallery")} disabled={actualPanel === "gallery" && true}>Galeria</button>
      </div>
      {  
         actualPanel === "room" ? <RoomsTable /> : actualPanel === "reservation" ? <ReservationsTable /> : actualPanel === "facilities" ? <FacilitiesTable/> : <GalleryTable/>
      }
      
      
    </div>

    </div>
      : <div className="mt-36 text-black text-center items-center justify-center m-auto">
         <div className="bg-[#4d4a4a] rounded-lg border-2 border-[#8a8787] shadow-md shadow-[#4d4a4a] p-10 ">
            <h2 className="text-[20px]">Inicie sesión desde un navegador para poder acceder a esta ruta</h2>

            <div className="bg-white mt-2 w-[110px] rounded-md m-auto border-2 border-[#8a8787]  shadow-md shadow-[#8a8787]">
            <NavLink to="/home">
               <button>Volver al home</button>
            </NavLink>
            </div>
         </div>
      </div>
   }
   
   </>
  );
};
// switch (current) {
//   case "habitaciones":
//     return <RoomsTable />;
//   case "reservas":
//     return <ReservationsTable />;
//   case "productos":
//     return <ProductsTable />;
//   default:
//     return <RoomsTable />;
// }

export default AdminPanel;
