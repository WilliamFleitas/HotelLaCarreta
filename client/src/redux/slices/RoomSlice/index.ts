import { createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface RoomsDetails {
  name: string;
	description: string;
	preDescription: string;
	images: string[];
	price: number;
	enabled: boolean;
  capacity: number;
	roomZone: string;
	room_features: string[];
	bathroom_features: string[];
	room_services: string[];
  id: string;
}

interface RoomsState {
  roomList: Array<RoomsDetails>;
  // roomDetail: RoomsDetails;
}
const initialState: RoomsState = {
  roomList: [] 
  // roomDetail: {
  //   name: "",
  //   description: "",
  //   preDescription: "",
  //   images: [],
  //   price: 0,
  //   enabled: true,zz
  // }
};

const RoomSlice = createSlice({
  name: "Rooms",
  initialState,
  reducers: {
    getRooms(state, action) {
      state.roomList = action.payload;
    },

  }
});

export default RoomSlice.reducer;
export const { getRooms } = RoomSlice.actions;