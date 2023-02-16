import React, { useState } from "react";
import ProductsTable from "./ProductsTable";
import ReservationsTable from "./ReservationsTable";
import RoomsTable from "./RoomsTable";

const AdminPanel = () => {

   const [panelSwitch, setPanelSwitch] = useState(true);
   const [resButton, setResbutton] = useState(false);
   const [roomButton, setRoomButton] = useState(false);
  console.log(window.location.pathname)
   const [color, changeColor] = useState("#928282");
  const path = window.location.pathname;
   
  if(path === "/admin/dashboard" || path === "/admin/dashboard/createroom"){
      document.body.style.backgroundColor = color;
   }
   const handleSwitch = (item: string) => {
      switch(item){
         case "room":
            setPanelSwitch(true);
            setRoomButton(true);
            setResbutton(false);
            break;
         case "reservation":
            setPanelSwitch(false);
            setResbutton(true);
            setRoomButton(false);
            break;
         default:
            setPanelSwitch(true);
            setRoomButton(true);
            setResbutton(false);
      }
   };

  return (
    <div className=" shadow-md border-2 mt-20  shadow-white  relative bg-[#928282] rounded-xl pb-14">

      <div className="text-center flex flex-row justify-center items-center gap-5 p-2 bg-[#2f2e2e] border-2 rounded-xl ">
        <button className={`border-2 shadow-sm shadow-white rounded-md px-2 hover:bg-[#4a4949] hover:shadow-sm  hover:shadow-white ${panelSwitch ? "shadow-sm shadow-white bg-[#4a4949]": ""}`} onClick={() => handleSwitch("room")} disabled={roomButton}>Habitaciones</button>
        <button className={`border-2 shadow-sm shadow-white rounded-md px-2 hover:bg-[#4a4949] hover:shadow-sm  hover:shadow-white ${!panelSwitch ? "shadow-sm shadow-white bg-[#4a4949]": ""}`} onClick={() => handleSwitch("reservation")} disabled={resButton}>Reservas</button>
      </div>
      {  
         panelSwitch ? <RoomsTable /> : <ReservationsTable />
      }
      
      
    </div>
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
