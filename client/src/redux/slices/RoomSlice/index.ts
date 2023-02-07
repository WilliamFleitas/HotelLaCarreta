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
};

interface BookingIdType {
  payment: string;
  payAmount: number;
};

interface DebtType {
  meta : {status: string, description: string | undefined},
  debt: {
    payStatus: {
      status: string;
    },
    objStatus: {
      status: string;
    },
    payUrl: string
  } | undefined,
  amount: {
    value: string, paid: string
  } | undefined,

};

interface RoomsState {
  roomList: Array<RoomsDetails>;
  bookingById: BookingIdType;
  roomDetail: RoomsDetails;
  debtDetail: DebtType;
  higherPriceRoomList: Array<RoomsDetails>
  error: string;
  loading: boolean;
};

const initialState: RoomsState = {
  roomList: [],
  debtDetail: {
    meta : {status: "", description: "" || undefined},
  debt: {
    payStatus: {
      status: ""
    },
    objStatus: {
      status: ""
    },
    payUrl: "",
  } || undefined,
  amount: {
    value: "", paid: ""
  } || undefined
  },
  bookingById: {
    payment: "",
    payAmount: 0,
  },
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
    setDebtDetail(state, action: PayloadAction<DebtType>){
      state.debtDetail = action.payload;
    },
    bookingById(state, action: PayloadAction<BookingIdType>) {
      state.bookingById = action.payload;
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
export const { getRooms, roomById, setErrors, clearRoomDetail, setLoading, setHigherPriceRooms, bookingById, setDebtDetail } = RoomSlice.actions;