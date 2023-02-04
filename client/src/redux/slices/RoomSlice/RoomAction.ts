import axios from "axios";
import { bookingById, clearRoomDetail, getRooms, roomById, RoomsDetails, setErrors, setHigherPriceRooms, setLoading } from ".";
import { AppDispatch } from "../../../store";

const urlBack: string = (import.meta.env.VITE_BACK_URL as string);

export const getAllRooms = () => (dispatch: AppDispatch) => {

    axios.get(`${urlBack}/rooms`).then(({data}) => {
       
            dispatch(getRooms(data));
        
    }).catch((error) => {
        console.log(error);
    });
};

export const getHigherPrice = () => (dispatch: AppDispatch) => {

    axios.get(`${urlBack}/rooms/roombyprices`).then(({data}) => {
       
            dispatch(setHigherPriceRooms(data));
        
    }).catch((error) => {
        console.log(error);
    });
};

export const getRoomId = (id: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(clearRoomDetail());
    axios.get(`${urlBack}/rooms/${id}`).then(({data}) => {       
    dispatch(roomById(data));
    }).catch((errors) => {
        dispatch(setErrors(errors.response.data))
        console.log(errors);
    }).finally(() => {
        dispatch(setLoading(false));
    });
};

export const getBookingById = (id: string ) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
        axios.get(`${urlBack}/reservations/bookingid/${id}`).then(({data}) => {
            dispatch(bookingById(data));
        }).catch((errors) => {
            dispatch(setErrors(errors.response.data))
            console.log(errors);
        }).finally(() => {
            dispatch(setLoading(false));
        });
    
};