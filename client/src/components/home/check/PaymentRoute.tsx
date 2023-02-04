import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getBookingById, getRoomId } from "../../../redux/slices/RoomSlice/RoomAction";

export const PaymentRoute = () => {

    let [params] = useSearchParams(window.location.search);
    let id = params.get("doc_id");

    const result = useAppSelector((state) => state.rooms.bookingById);
    const { loading, error } = useAppSelector((state) => state.rooms);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(getBookingById(id as string) as any);
    }, [dispatch])

    if(loading){
        return (
            <div className="text-black pt-36"><h3>Loading..</h3></div>
        )
    }

    if(result.payment === "none" || result.payment === "partial" ){
        return (
            <div className="text-black pt-36">
               <h3>Algo fallo, intentelo de nuevo más tarde!</h3> 
               <button>Volver al home</button>
               <button>Seguir viendo habitaciones</button>
            </div>
        )
    }
    return ( 
        <div className="text-black pt-36">
            <h3>GRACIAS POR COMPRAR PRRO</h3>
        </div>
    )
};