import React, { useEffect } from "react";
import dayjs from "dayjs";
import updateLocale from'dayjs/plugin/updateLocale';
import {  useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {  getBookingById, getDebtAdams} from "../../../redux/slices/RoomSlice/RoomAction";

export const PaymentRoute = () => {

    let [params] = useSearchParams(window.location.search);
    let id = params.get("doc_id");

    const result = useAppSelector((state) => state.rooms.debtDetail);
    const bookingId = useAppSelector((state) => state.rooms.bookingById);
    console.log("result", result);
    console.log("result", bookingId);
    const { loading, error } = useAppSelector((state) => state.rooms);
    console.log("erro", error);
    const dispatch = useAppDispatch();
    //el getbookinid tiene que ser comparado con el notify de la api, no usar la funcion, hacer otra
    useEffect(() => {
        dispatch(getDebtAdams(id as string));
        dispatch(getBookingById(id as string));
    }, [dispatch])

    if(loading){
        return (
            <div className="text-black pt-36"><h3>Loading..</h3></div>
        )
    };

    if(error){
        return (
            <div className="text-black pt-36">
                <h2>Ha ocurrido un error intentelo más tarde!</h2>
                <h4>Mensaje: {error}</h4>
            </div>
        )
    };

    if(result.debt?.payStatus.status === "pending" && result.debt.objStatus.status === "active"){
        return (
            <div className="text-black pt-36">
            <h2>Algo salio mal!</h2>
            <h3>Vuelva a intentarlo en un momento</h3>
            <h4>Pagar reserva: <a href={result.debt.payUrl}>LINK</a> </h4>
            <button>Volver al home</button>
            <button>Seguir viendo habitaciones</button>
        </div>
            
        ) 
    }

    if(result.debt?.payStatus.status === "paid" && result.debt.objStatus.status === "success"){
        return (
            <div className="text-black pt-36">
                <h2>Información de la reserva</h2>
            
            <div className="p-5">
                
                <ul>
                    <li>Se confirmo reserva de la {result.debt?.label?.slice(10)}</li>
                    <li>Habitación reservada para la fecha: {bookingId.entryDate.slice(0, 10)}</li>
                    <li>Horario de entrada: 12:00AM</li>
                    <li>Horario de salida: 10:00AM</li>
                    <li>Costo total: {bookingId.payAmount}GS</li>
                </ul>
                
            </div>
            
            <h4>Le enviaremos un correo con los datos de la reserva!</h4>

            <p>{bookingId.adults > 1 || bookingId.childs > 0 ? `¡Gracias por su preferencia, ${bookingId.name.charAt(0).toUpperCase() + bookingId.name.slice(1)}, los esperamos!` : `¡Gracias por su preferencia, ${bookingId.name.charAt(0).toUpperCase() + bookingId.name.slice(1)}, te esperamos!`}</p>
            <h3></h3>
            <button>Volver al home</button>
            <button>Seguir viendo habitaciones</button>
        </div>
            
        )
    };

    return ( 
        <div className="text-black pt-36">
                <h2>¡Gracias por su preferencia!</h2>
               <h3>Aviso: Cuando realice el pago completo se concretara la reserva, le enviaremos un correo notificando cualquier cambio!</h3> 
               <button>Volver al home</button>
               <button>Seguir viendo habitaciones</button>
            </div>
    )
};