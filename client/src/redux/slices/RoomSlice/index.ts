import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { ReservationType } from "../../../types/Reservation";

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
  RoomId: string;
};

interface BookingIdType {
  payment: string;
  payAmount: number;
  adults: number,
  childs: number,
  name: string,
  entryDate: string,
};

interface DebtType {
  meta : {status: string, description: string | undefined},
  debt: {
    label: string,
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
export interface checkType {
  date: string;
  roomType: "Moderna" | "Rustica" | "";
} 

interface RoomsState {
  roomList: Array<RoomsDetails>;
  bookingById: BookingIdType;
  roomDetail: RoomsDetails;
  debtDetail: DebtType;
  checkFilters: checkType;
  filteredReservations: ReservationType[];
  higherPriceRoomList: Array<RoomsDetails>
  error: string;
  loading: boolean;
};

const initialState: RoomsState = {
  roomList: [],
  debtDetail: {
    meta : {status: "", description: "" || undefined},
  debt: {
    label: "",
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
    adults: 0,
    childs: 0,
    name: "",
    entryDate: "",
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
      RoomId: "",
  },
  checkFilters: {
    date: "",
    roomType: "",
  },
  filteredReservations: [],
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
    setFilteredReservations(state, action: PayloadAction<ReservationType[]>){
      state.filteredReservations = action.payload
    },
    setDebtDetail(state, action: PayloadAction<DebtType>){
      state.debtDetail = action.payload;
    },
    clearBookingById(state){
      state.bookingById = {
        payment: "",
        payAmount: 0,
        adults: 0,
        childs: 0,
        name: "",
        entryDate: "",
      }
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
      RoomId: "",
    };
    },
    clearRoomList(state) {
      state.roomList = [];
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setCheckFilters(state, action: PayloadAction<checkType>) {
      state.checkFilters = action.payload;
    },
  }
});

export default RoomSlice.reducer;
export const { getRooms, roomById, setErrors, clearRoomDetail, setLoading, setHigherPriceRooms, bookingById, setDebtDetail, setCheckFilters, setFilteredReservations, clearRoomList, clearBookingById } = RoomSlice.actions;