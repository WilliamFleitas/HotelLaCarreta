import axios from "axios";
import { Dispatch } from "react";
import { clearRoomDetail, getRooms, roomById, RoomsDetails, setErrors, setLoading } from ".";
import { AppDispatch } from "../../../store";


export const getAllRooms = () => (dispatch: AppDispatch) => {

    axios.get("http://localhost:3001/rooms").then(({data}) => {
       
            dispatch(getRooms(data));
        
    }).catch((error) => {
        console.log(error);
    });
};

export const getRoomId = (id: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(clearRoomDetail());
    axios.get(`http://localhost:3001/rooms/${id}`).then(({data}) => {       
    dispatch(roomById(data));
    }).catch((errors) => {
        dispatch(setErrors(errors.response.data))
        console.log(errors);
    }).finally(() => {
        dispatch(setLoading(false));
    });
}