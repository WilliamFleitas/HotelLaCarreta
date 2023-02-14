import React from "react";
import ProductsTable from "./ProductsTable";
import ReservationsTable from "./ReservationsTable";
import RoomsTable from "./RoomsTable";

const AdminPanel = () => {
 
 
   return (
        <div>
       <RoomsTable />
       <ReservationsTable />
      <ProductsTable />
      </div>
   )     
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
