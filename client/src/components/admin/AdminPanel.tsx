import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAppDispatch, useAppSelector} from "../../hooks";
import ProductsTable from "./ProductsTable";
import ReservationsTable from "./ReservationsTable";
import RoomsTable from "./RoomsTable";

const AdminPanel = () => {
  const current = useAppSelector((state) => state.admin.current);
  const dispatch = useAppDispatch();

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
