import axios from "axios";
import { bookingById, checkType, clearBookingById, clearRoomDetail, clearRoomList, getRooms, roomById, RoomsDetails, setCheckFilters, setDebtDetail, setErrors, setFilteredReservations, setHigherPriceRooms, setLoading, setLoadingDetail } from ".";
import { AppDispatch } from "../../../store";

const urlBack: string = (import.meta.env.VITE_BACK_URL as string);

export const getAllRooms = (date?: string, roomType?: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(clearRoomList());
    const url : string = date || roomType ? `${urlBack}/rooms?date=${date}&roomType=${roomType}` : `${urlBack}/rooms`;

    axios.get(url).then(({data}) => {
       
            dispatch(getRooms(data));
        
    }).catch((error) => {
        setErrors("Hubo un error cargando las habitaciones, intente recargando la pagina");
    }).finally(() => {
        dispatch(setLoading(false));
    });
};

export const setCheckFiltersAction = (date: string, roomType: string) => (dispatch: AppDispatch) => {
    const obj = {date, roomType} as checkType;
    dispatch(setCheckFilters(obj));
    dispatch(getAllRooms(date!, roomType!));
};

export const getHigherPrice = () => (dispatch: AppDispatch) => {
   dispatch(setLoadingDetail(true))
    axios.get(`${urlBack}/rooms/roombyprices`).then(({data}) => {
       
            dispatch(setHigherPriceRooms(data));
        
    }).catch((error) => {
        setErrors("Hubo un error cargando las habitaciones, intente recargando la pagina");
    }).finally(() => {
        dispatch(setLoadingDetail(false))
    });
};

export const getFilteredReservations = () => (dispatch: AppDispatch) => {
    axios.get(`${urlBack}/reservations/admin/filteredres`).then(({data}) => {
        dispatch(setFilteredReservations(data));
    }).catch((error) => {
        setErrors("Hubo un error cargando las reservas, intente recargando la pagina");
    });
}

export const getRoomId = (id: string) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(clearRoomDetail());
    axios.get(`${urlBack}/rooms/${id}`).then(({data}) => {       
    dispatch(roomById(data));
    }).catch((errors) => {
        dispatch(setErrors(errors.response.data))
        
    }).finally(() => {
        dispatch(setLoading(false));
    });
};

export const getBookingById = (id: string ) => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    dispatch(clearBookingById());
        axios.get(`${urlBack}/reservations/bookingid/${id}`).then(({data}) => {
            dispatch(bookingById(data));
        }).catch((errors) => {
            dispatch(setErrors(errors.response.data))
           
        }).finally(() => {
            dispatch(setLoading(false));
        });
    
};

export const getDebtAdams = (id: string ):any => (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
        axios.get(`${urlBack}/reservations/adams/debtbyid/${id}`).then(({data}) => {
            dispatch(setDebtDetail(data));
        }).catch((errors) => {
            dispatch(setErrors(errors.response.data));
        }).finally(() => {
            dispatch(setLoading(false));
        });
    
};