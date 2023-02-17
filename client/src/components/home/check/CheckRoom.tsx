import React, { useEffect, useState } from "react";
import { DatePicker, message, Space } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

import { BsFillPersonFill } from "react-icons/bs";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { setErrors } from "../../../redux/slices/RoomSlice";
import axios from "axios";
import { setDebt } from "../../customHooks/PaymentFunctions";

// const BookingSchema = z.object({
//   checkIn: z.string(),
//   checkOut: z.string(),
//   adults: z
//     .number()
//     .min(1, { message: "Debe haber por lo menos un adulto" })
//     .max(7, { message: " El limite de habitaciones es de 7 personas" }),
//   childs: z
//     .number()
//     .max(7, { message: " El limite de habitaciones es de 7 personas" }),
// });


// type bookingType = z.infer<typeof BookingSchema>;

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";



interface CheckForm extends bookingDataType{
  checkIn: string;
  checkOut: string;
  reservedDays: string[];
  adults: number;
  childs: number;
  totalPrice: number;
  payment: string;
  nightQuantity: number;
  roomId: string;
}

interface CheckRoomProps {
  roomId?: string;
  reserved?: any;
  price?: number;
  roomName: string;
}

interface bookingDataType {
  name: string;
  dni: string | undefined;
  email: string;
}

interface errorsType {
  bookingName: string;
  bookingDni: string;
  bookingEmail: string;
  bookingButton: string;
}

export const CheckRoom = ({ roomId, reserved, price, roomName }: CheckRoomProps) => {
  

 

  const urlBack: string = (import.meta.env.VITE_BACK_URL as string);

  const initialForm = {
    checkIn: "",
    checkOut: "",
    reservedDays: [],
    adults: 1,
    childs: 0,
    totalPrice: 0,
    nightQuantity: 0,
    name: "",
    dni: "",
    email: "",
    roomId: "",
    payment: "none",
  };


  const [bookingInput, setBookingInput] = useState<CheckForm>(initialForm);
  const [adultsCounter, setAdultsCounter] = useState(1);
  const [childCounter, setChildCounter] = useState(0);
  const [maxValue, setMaxValue] = useState(6);
  const [guesSwitch, setGuestSwitch] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [bookingButtonSwitch, setBookingButtonSwitch] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [bookingData, setBookingData] = useState<bookingDataType>({
    name: "",
    dni: "",
    email: "",
  });
  const [checkErrors, setCheckErrors] = useState<errorsType>({
    bookingName: "",
    bookingDni: "",
    bookingEmail: "",
    bookingButton: "",
  });
 

  const reservedFilter = reserved.filter((e: any) => e.payment === "complete");

  const disabledDate: any = (current: any) => {
    const arrDays = reservedFilter?.map((e: any) => e.reservedDays).flat(Infinity);
    

    return (
      (current && current <= dayjs().startOf("hour")) ||
      arrDays.find((e: any) => {
        return (
          dayjs(e).format("YYYY/MM/DD") === dayjs(current).format("YYYY/MM/DD")
        );
      })
    );
  };

  const handleRangePicker = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    setShowRate(false);
    const bookIn = new Date(dateString?.[0]).getTime();
    const bookOut = new Date(dateString?.[1]).getTime();

    let dates: any = [];

    const theDate = new Date(bookIn);
    while (theDate < new Date(bookOut)) {
      dates = [...dates, new Date(dayjs(theDate).format("YYYY/MM/DD"))];
      theDate.setDate(theDate.getDate() + 1);
    }

    const Difference_In_Time = bookOut - bookIn;
    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    setBookingInput({
      ...bookingInput,
      reservedDays: dates.length > 0 ? dates : dateString[0],
      checkIn: dateString[0],
      checkOut: dateString[1],
      nightQuantity: Difference_In_Days,
    });

  };

  const handleOnOk = () => {
    setShowRate(false);
    setBookingInput({
      ...bookingInput,
      adults: adultsCounter,
      childs: childCounter,
    });
    setGuestSwitch(false);
  };

  const showPrice = () => {
    const guest = bookingInput.adults;
    const daysReserved =
      bookingInput.nightQuantity > 0 ? bookingInput.nightQuantity : 1;
    const amount = guest * price!;
    const daysAmount = daysReserved * amount;

    if (bookingInput.childs > 0) {
      const childsPrice = bookingInput.childs * (price! / 2);
      const childsAmount = childsPrice * daysReserved;
      setBookingInput({
        ...bookingInput,
        totalPrice: childsAmount! + daysAmount,
      });
      return;
    }
    setBookingInput({ ...bookingInput, totalPrice: daysAmount });
    setShowRate(true);
  };

  const handleBookingOk = () => {
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(bookingData.email) && bookingData.email.length  && bookingData.name.length  &&  roomId){
      
        setBookingInput({
          ...bookingInput,
          name: bookingData.name,
          email: bookingData.email,
          dni: bookingData.dni,
          roomId: roomId as string
        });
        setBookingData({...bookingData, name: "", dni: "", email: "",})
        setCheckErrors({ ...checkErrors, bookingName: "", bookingDni: "", bookingEmail: ""});
        return;
      } else  {
        if(!bookingData.name.length && !bookingData.email.length){
          setCheckErrors({
            ...checkErrors, bookingName: "Ingresar un nombre",
            bookingEmail: "Ingresar un email al cual notificar"
          });
        }
        else if(!bookingData.name.length){
          setCheckErrors({
            ...checkErrors, bookingName: "Ingresar un nombre", bookingEmail: ""
          });
        }
        else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(bookingData.email) || !bookingData.email.length){
          setCheckErrors({
            ...checkErrors, bookingName: "", bookingEmail: "Ingresar un email valido"
          });
        }
        setBookingInput({...bookingInput, name: "", dni: "", email: ""});
      }
};
    
 
  const handleBooking = async ()=> { 
      if(bookingInput.checkIn.length &&
      bookingInput.checkOut.length &&
      bookingInput.reservedDays.length > 0 &&
      bookingInput.adults > 0 &&
      bookingInput.totalPrice > 0 &&
      bookingInput.nightQuantity > 0 &&
      bookingInput.name.length && bookingInput.email.length ){
        setDisableButton(true);
       const res = await axios.post(`${urlBack}/reservations`, bookingInput)
       await setDebt({
        debt: {
            docId: res.data.id,
            amount: {
                currency: "PYG",
                value: res.data.payAmount

            },
            label: `Reserva de habitación ${roomName} para ${res.data.adults} adulto/s y ${res.data.childs} niño/s, por ${res.data.nightQuantity} noche/s. `,
            target: {
                type: "cip",
                number: res.data.dni ? res.data.dni : null,
                label: res.data.email
            },
            validPeriod: {
                start: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
                end: dayjs().add(30, "minute").format("YYYY-MM-DDTHH:mm:ssZ")
            }
        }
    });
    setShowRate(false);
      }
      else {
        setCheckErrors({...checkErrors, bookingButton: "Faltan datos para hacer la reserva"});
      }
  };

 

  return (
    <div className="text-black text-center items-center justify-center">
      <h2 className="text-[#B35642] text-[30px] pb-8">Cotización</h2>
      <div className="flex flex-row justify-center p-5 space-x-3">
        <div>
          <h3 className="text-[#B35642] text-[24px]">Check In/Check Out</h3>
          <div className="">
            <RangePicker
              disabledDate={disabledDate}
              format={dateFormat}
              onChange={handleRangePicker}
              id="checkIn"
              className="p-3 border-2 shadow-md shadow-[#B35642] border-[#B35642] hover:border-[#B35642] font-bold text-[#c7cbce]"
            />
          </div>
        </div>

        <div className="relative text-center items-center justify-center ">
          <h3 className="text-[#B35642] text-[24px]">Guest</h3>

          <div
            className="flex flex-row gap-5 p-[11.4px] rounded-lg border-[2px] border-[#B35642]  text-[#c0c0c0] font-bold shadow-md shadow-[#B35642]"
            onClick={() => setGuestSwitch(true)}
          >
            <div className="">
              <h3 className=""> adults: {bookingInput.adults} </h3>
            </div>

            <h3>childs: {bookingInput.childs}</h3>

            <div className="pt-1">
              <BsFillPersonFill />
            </div>
          </div>
          {guesSwitch ? (
            <div className="border p-2 w-full  z-10 absolute text-center items-center justify-center bg-white rounded-lg mt-2 shadow-md shadow-[#B35642] text-[17px]">
              <div className="items-center justify-center text-center">
                <h3 className="">Adultos</h3>
                <div className="space-x-5 pt-2 pb-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (adultsCounter < 7) {
                        if (maxValue > 0) {
                          setAdultsCounter(adultsCounter + 1);
                          setMaxValue(maxValue - 1);
                        }
                      }
                    }}
                  >
                    {" "}
                    <h3 className="text-[22px]">
                      <FaPlusCircle />
                    </h3>{" "}
                  </button>
                  <label className="text-[20px]">{adultsCounter}</label>
                  <button
                    type="button"
                    onClick={() => {
                      if (adultsCounter > 0) {
                        if (maxValue < 7) {
                          setAdultsCounter(adultsCounter - 1);
                          setMaxValue(maxValue + 1);
                        }
                      }
                    }}
                  >
                    <h3 className="text-[22px]">
                      <FaMinusCircle />
                    </h3>
                  </button>
                </div>
              </div>

              <div className="">
                <h3 className="">Niños</h3>
                <h4 className="">(menores de 10 años)</h4>
                <div className="space-x-5 pt-2 pb-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (childCounter < 7) {
                        if (maxValue > 0) {
                          setChildCounter(childCounter + 1);
                          setMaxValue(maxValue - 1);
                        }
                      }
                    }}
                  >
                    <h3 className="text-[22px]">
                      <FaPlusCircle />
                    </h3>
                  </button>
                  <label className="text-[20px]">{childCounter}</label>
                  <button
                    type="button"
                    onClick={() => {
                      if (childCounter > 0) {
                        if (maxValue < 7) {
                          setChildCounter(childCounter - 1);
                          setMaxValue(maxValue + 1);
                        }
                      }
                    }}
                  >
                    <h3 className="text-[22px]">
                      <FaMinusCircle />
                    </h3>
                  </button>
                </div>
              </div>
              <button
                className="border-2 border-[#b6b5b5]  p-1 px-2 text-white  rounded-lg bg-[#B35642]  hover:bg-[#ec775f] hover:duration-300"
                onClick={() => handleOnOk()}
              >
                Ok
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="text-center items-center justify-center p-[29px]">
          {bookingInput.checkIn.length > 0 &&
          bookingInput.checkOut.length > 0 &&
          bookingInput.adults > 0 ? (
            <button
              type="button"
              className="px-4 duration-300  py-2 text-[#B35642] bg-white text-[20px]  hover:duration-300  rounded-lg font-bold  border-[#E2725B] p-3 3x1:ml-5 hover:border-[#E2725B] hover:bg-zinc-100 shadow-md shadow-[#B35642] "
              onClick={() => showPrice()}
            >
              Ver tarifa
            </button>
          ) : (
            <button
              type="button"
              className="  px-4 duration-300  py-2 text-white bg-[#B35642] text-[20px] hover:bg-[#ec775f] hover:duration-300  rounded-lg font-bold  shadow-md shadow-[#5f5e5e] border border-[#c9c3c3]"
              disabled
            >
              Ver tarifa
            </button>
          )}
        </div>
      </div>

      {/* tarifa */}
      {bookingInput.checkIn &&
      bookingInput.checkOut &&
      bookingInput.adults &&
      showRate ? (
        <div className="p-10 items-center justify-center text-center ">
          <div className="bg-[#B35642]  grid grid-cols-2 px-10  gap-x-20 p-5 rounded-lg relative pb-10 shadow-lg shadow-[#5f5e5e]">
            <div className="p-5 text-start ">
              <h3>
                Del {bookingInput?.checkIn} hasta el {bookingInput.checkOut}
              </h3>
              <h3>Cantidad de adultos: {bookingInput.adults}</h3>
              <h3>Cantidad de niños: {bookingInput.childs}</h3>
              <h3>
                Cantidad de noches:{" "}
                {bookingInput.nightQuantity > 0
                  ? bookingInput.nightQuantity
                  : 1}
              </h3>
              <h3>Reserva a nombre de: {bookingInput.name ? bookingInput.name: "Inserte un nombre"}</h3>
              <h3>Notificar a email: {bookingInput.email ? bookingInput.email: "Inserte un email"}</h3>
              <div className={`grid grid-cols-2 gap-x-1  ${checkErrors.bookingName.length ? "mb-0": "mb-20"}`}>
                <div className="">
                  <label className="text-sm text-black relative top-[8px] left-3 bg-[#B35642] border-2 border-black w-fit px-1 rounded-xl">
                    Nombre
                  </label>
                  <input
                    placeholder="Nombre del que reserva.."
                    value={bookingData.name}
                    className={`w-full border border-[#B35642] shadow-inner shadow-black rounded-xl px-3 py-2`}
                    
                    type="text"
                    id="nameBooking"
                    onChange={(e) =>
                      setBookingData({ ...bookingData, name: e.target.value })
                    }
                  />
                    {
                checkErrors.bookingName.length ?  <h2 className=" text-white">{checkErrors.bookingName}</h2>  : <></>
                  }
                </div>
                
                <div className="">
                  <label className="text-sm text-black relative top-[8px] left-3 bg-[#B35642] border-2 border-black w-fit px-1 rounded-xl">
                    Email
                  </label>
                  <input
                    placeholder="Email.."
                    className={`w-full border border-[#B35642] shadow-inner shadow-black rounded-xl px-3 py-2`}
                    value={bookingData.email.trim()}
                    type="text"
                    id="emailBooking"
                    onChange={(e) =>
                      setBookingData({ ...bookingData, email: e.target.value })
                    }
                  />
                  {
                checkErrors.bookingEmail.length ? <h2 className=" text-white">{checkErrors.bookingEmail}</h2> : <></>
                
              }
                </div>

                <div className="pb-16">
                  <label className="text-sm text-black  relative top-[8px] left-3 bg-[#B35642] border-2 border-black w-fit px-1 rounded-xl">
                    DNI
                  </label>
                  <input 
                    placeholder="DNI del que reserva.."
                    className={`w-full border shadow-inner  shadow-black border-[#B35642] rounded-xl px-3 py-2`}
                    type="number"
                    id="dniBooking"
                    onChange={(e) =>
                      setBookingData({ ...bookingData, dni: e.target.value })
                    }
                  />
                </div>
                
                <div className="">
                  <button
                    onClick={handleBookingOk}
                    type="button"
                    id="bookingOk"
                    className="duration-300 text-[#B35642]   rounded-lg bg-white  hover:bg-[#c9c3c3] hover:duration-300 mt-[23.8px]  h-fit gap-x-0 px-3 py-2 font-bold  shadow-md shadow-[#5f5e5e] border border-[#c9c3c3]"
                  >
                    OK
                  </button>
                </div>
                
              </div>
            
            </div>
                
              
            <div className="justify-end items-end text-end ">
              <div className="p-5 text-start  bg-white rounded-md shadow-lg shadow-[#5f5e5e]">
                <ul>
                  <li>- Menores de 10 años pagan el 50%.</li>
                  <li>
                    - Fecha limite de 72 horas antes del check in para cancelar
                    reservas, se devuelve el 35% del importe.
                  </li>
                  <li>
                    - En caso de pasar la fecha limite el pago es retenido pero
                    cuenta con la opción de reservar otro día.
                  </li>
                  <li>
                    - Debe pagarse el precio completo para concretar la reserva
                  </li>
                </ul>
              </div>
            </div>

            <div className="absolute bottom-2 right-[50%] ">
               <h2 className="">Precio total: {bookingInput.totalPrice}GS</h2>
              <button
                className="w-fit px-2 duration-300 text-[#B35642] bg-white  hover:bg-[#c9c3c3] hover:duration-300 py-2 rounded-lg font-bold  mt-2 shadow-md shadow-[#5f5e5e] border border-[#c9c3c3]" disabled={disableButton}
                type="button" onClick={handleBooking}
              >
                RESERVAR
              </button>
              {
                checkErrors.bookingButton.length ? <div><h2 className=" text-white">{checkErrors.bookingButton}</h2></div> : <></>
              }
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      
    </div>
  );
};
