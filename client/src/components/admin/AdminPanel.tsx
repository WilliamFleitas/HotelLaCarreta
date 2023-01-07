import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import ProductsTable from "./ProductsTable";
import ReservationsTable from "./ReservationsTable";
import RoomsTable from "./RoomsTable";

const AdminPanel = () => {
  const current = useSelector((state: RootState) => state.admin.current);
  const dispatch: AppDispatch = useDispatch();

  switch (current) {
    case "habitaciones":
      return <RoomsTable />;
    case "reservas":
      return <ReservationsTable />;
    case "productos":
      return <ProductsTable />;
    default:
      return <RoomsTable />;
  }
};

export default AdminPanel;
