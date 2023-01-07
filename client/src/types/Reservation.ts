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
  id: string;
  name: string;
  capacity: Number;
  description: string;
  preDescription: string;
  images: Array<string>;
  price: Number;
  enabled: Boolean;
}

export interface EditRoomProps {
  edit: boolean;
  setEdit: Dispatch<SetStateAction<boolean>>;
  data: Room;
}
