import { Dispatch, SetStateAction } from "react";
import { RoomsDetails } from "../redux/slices/RoomSlice";

export interface ReservationRowType {
  id: string;
  room: RoomsDetails
  reservation: ReservationType;
}

export interface ReservationAllRowType {
  id: string;
  room: RoomsDetails
  reservation: ReservationType[];
}

export interface ReservationType {
  id: string;
  name: string;
  email: string;
  entryDate: string;
  exitDate: string;
  payment: string;
  payAmount:number;
  reservedDays: string[];
  nightQuantity: number;
  adults: number;
  childs: number;
  dni: string;
  roomId: string;
}
export interface MiniRoom {
  id: String;
  name: String;
  capacity: Number;
  price: Number;
  image: string;
}


export interface Room {
  name: string;
  description: string;
  preDescription: string;
  images: string[];
  price: number;
  capacity: number;
  enabled: Boolean;
  roomZone: string;
  room_features: string[];
  bathroom_features: string[];
  room_services: string[];
  id: string;
  Reservations?: ReservationType[];
  handleEnable?: any;
}

export interface EditRoomProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  data: Room;
}
