import { Dispatch, SetStateAction } from "react";

export interface Reservation {
  id: String;
  email: String;
  rooms: Array<MiniRoom>;
  adults: Number;
  childs: Number;
  entryDate: String;
  exitDate: String;
  price: Number;
  payment: String;
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
}

export interface EditRoomProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  data: Room;
}
