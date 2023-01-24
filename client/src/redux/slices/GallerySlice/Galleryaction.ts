import axios from "axios";
import { setPostLength, setPostList } from ".";
import { AppDispatch } from "../../../store";


const urlBack: string = (import.meta.env.VITE_BACK_URL as string);

export const getAllPost = (page?:number) => (dispatch: AppDispatch) => {
    let aux = page ? page: 1
    let url = page ? `${urlBack}/gallery?page=${page}` : `${urlBack}/gallery`
    axios.get(url).then(({data}) => {
    dispatch(setPostList(data.rows ? data.rows : data));
    dispatch(setPostLength(data.count));
}).catch((error) => {
console.log(error);
}); 
};