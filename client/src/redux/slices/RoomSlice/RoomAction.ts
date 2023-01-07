import axios from "axios";
import { Dispatch } from "react";
import { getRooms } from ".";
import { AppDispatch } from "../../../store";


export const getAllRooms = () => (dispatch: AppDispatch) => {

    axios.get("http://localhost:3001/rooms").then(({data}) => {
        dispatch(getRooms(data))
    }).catch((error) => {
        console.log(error);
    })
};