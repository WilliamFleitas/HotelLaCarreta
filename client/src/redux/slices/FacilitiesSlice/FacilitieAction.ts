import axios from "axios";
import { setFacilities } from ".";
import { AppDispatch } from "../../../store";

const urlBack: string = (import.meta.env.VITE_BACK_URL as string);

export const getAllFacilities = () => (dispatch: AppDispatch) => {
    axios.get(`${urlBack}/facilities`).then(({data}) => {
        dispatch(setFacilities(data));
    }).catch((error) => {
       
    })
};