import axios from "axios";
import { setFacilities } from ".";
import { AppDispatch } from "../../../store";

export const getAllFacilities = () => (dispatch: AppDispatch) => {
    axios.get("http://localhost:3001/facilities").then(({data}) => {
        dispatch(setFacilities(data));
    }).catch((error) => {
        console.log(error);
    })
};