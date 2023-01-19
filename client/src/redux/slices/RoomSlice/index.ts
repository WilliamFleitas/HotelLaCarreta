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
  Reservations: any[];
}

interface RoomsState {
  roomList: Array<RoomsDetails>;
  roomDetail: RoomsDetails;
  higherPriceRoomList: Array<RoomsDetails>
  error: string;
  loading: boolean;
}
const initialState: RoomsState = {
  roomList: [],
  higherPriceRoomList: [],
  roomDetail: {
      name: "",
	    description: "",
	    preDescription: "",
	    images: [],
	    price: 0,
	    enabled: true,
      capacity: 0,
	    roomZone: "",
	    room_features: [],
	    bathroom_features: [],
	    room_services: [],
      id: "",
      Reservations: [],
  },
  error: "",
  loading: false,
};

const RoomSlice = createSlice({
  name: "Rooms",
  initialState,
  reducers: {
    getRooms(state, action: PayloadAction<Array<RoomsDetails>>) {
      state.roomList = action.payload;
    },
    setHigherPriceRooms(state, action: PayloadAction<Array<RoomsDetails>>) {
      state.higherPriceRoomList = action.payload;
    },
    roomById(state, action: PayloadAction<RoomsDetails>) {
      state.roomDetail = action.payload;
    },
    setErrors(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    clearRoomDetail(state) {
      state.error = "",
      state.roomDetail = {
      name: "",
	    description: "",
	    preDescription: "",
	    images: [],
	    price: 0,
	    enabled: true,
      capacity: 0,
	    roomZone: "",
	    room_features: [],
	    bathroom_features: [],
	    room_services: [],
      id: "",
      Reservations: [],
    };
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  }
});

export default RoomSlice.reducer;
export const { getRooms, roomById, setErrors, clearRoomDetail, setLoading, setHigherPriceRooms } = RoomSlice.actions;