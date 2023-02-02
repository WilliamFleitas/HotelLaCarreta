import React, { useEffect, useState } from "react";
import { DatePicker, message, Space } from "antd";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import dayjs from "dayjs";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

import { BsFillPersonFill } from "react-icons/bs";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";

const BookingSchema = z.object({
  checkIn: z.string(),
  checkOut: z.string(),
  adults: z
    .number()
    .min(1, { message: "Debe haber por lo menos un adulto" })
    .max(7, { message: " El limite de habitaciones es de 7 personas" }),
  childs: z
    .number()
    .max(7, { message: " El limite de habitaciones es de 7 personas" }),
});

type bookingType = z.infer<typeof BookingSchema>;

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

interface CheckForm {
  checkIn: string;
  checkOut: string;
  reservedDays: string[];
  adults: number;
  childs: number;
  totalPrice: number;
  nightQuantity: number;
}

interface CheckRoomProps {
  roomId?: string;
  reserved?: any;
  price?: number;
}

export const CheckRoom = ({ roomId, reserved, price }: CheckRoomProps) => {
  // const {
  //   register,
  //   formState: { errors },
  //   handleSubmit,
  // } = useForm<bookingType>({
  //   resolver: zodResolver(BookingSchema)
  // })

  console.log("hola", reserved);
  const initialForm = {
    checkIn: "",
    checkOut: "",
    reservedDays: [],
    adults: 1,
    childs: 0,
    totalPrice: 0,
    nightQuantity: 0
  };
  const [bookingInput, setBookingInput] = useState<CheckForm>(initialForm);
  const [adultsCounter, setAdultsCounter] = useState(1);
  const [childCounter, setChildCounter] = useState(0);
  const [maxValue, setMaxValue] = useState(6);
  const [guesSwitch, setGuestSwitch] = useState(false);
  const [showRate, setShowRate] = useState(false);

  const disabledDate: any = (current: any) => {
    const arrDays = reserved?.map((e: any) => e.reservedDays).flat(Infinity);

    return (
      (current && current <= dayjs().startOf("day")) ||
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
    

    console.log("dates", dates);
    const Difference_In_Time = bookOut - bookIn;
    console.log("diferencia de tiempo", Difference_In_Time);
    // To calculate the no. of days between two dates
    const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    setBookingInput({
      ...bookingInput,
      reservedDays: dates.length > 0 ? dates : dateString[0],
      checkIn: dateString[0],
      checkOut: dateString[1],
      nightQuantity: Difference_In_Days
    });

    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    console.log("diferencias de dias", Difference_In_Days);
    console.log("asda", bookIn);
    console.log("asda2", bookOut);
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
    console.log("onsubmit", bookingInput);
    const guest = bookingInput.adults;
    const daysReserved = bookingInput.nightQuantity > 0 ?  bookingInput.nightQuantity : 1;
    const amount = guest * price!;
    const daysAmount =  daysReserved * amount;

    if(bookingInput.childs > 0){
      const childsPrice = bookingInput.childs * (price! / 2);
      const childsAmount = childsPrice * daysReserved;
      setBookingInput({...bookingInput, totalPrice: childsAmount! + daysAmount});
      console.log("as", guest, daysReserved, amount, daysAmount)
      return;
    }
    setBookingInput({...bookingInput, totalPrice: daysAmount});
    console.log("as", guest, daysReserved, amount, daysAmount)
    setShowRate(true);
  };
  console.log("asara", bookingInput.totalPrice);
  // useEffect(() => {

  // }, [adultsCounter, childCounter]);

  console.log("booking", bookingInput);
  console.log("adults", adultsCounter, childCounter);

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
              className="p-3 border-2 border-[#B35642] hover:border-[#B35642] font-bold text-[#c7cbce]"
            />
          </div>
        </div>

        <div className="relative text-center items-center justify-center ">
          <h3 className="text-[#B35642] text-[24px]">Guest</h3>

          <div
            className="flex flex-row gap-5 p-[11.4px] rounded-lg border-[2px] border-[#B35642]  text-[#c0c0c0] font-bold "
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
            <div className="border p-2 w-full  z-10 absolute text-center items-center justify-center bg-white rounded-lg mt-2 shadow-lg shadow-[#5f5e5e] text-[17px]">
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
              className="px-4 duration-300  py-2 text-white bg-[#B35642] text-[20px] hover:bg-[#ec775f] hover:duration-300  rounded-lg font-bold  "
              onClick={() => showPrice()}
            >
              Ver tarifa
            </button>
          ) : (
            <button
              type="button"
              className="  px-4 duration-300  py-2 text-white bg-[#B35642] text-[20px] hover:bg-[#ec775f] hover:duration-300  rounded-lg font-bold  "
              disabled
            >
              Ver tarifa
            </button>
          )}
        </div>
      </div>

      {/* tarifa */}
      { bookingInput.checkIn && bookingInput.checkOut && bookingInput.adults && showRate &&
        <div className="p-10 items-center justify-center text-center ">
          <div className="bg-[#B35642]  grid grid-cols-2 px-10  gap-x-20 p-5 rounded-lg relative">
            <div className="p-5 text-start">
              <h3>
                Del {bookingInput?.checkIn} hasta el {bookingInput.checkOut}
              </h3>
              <h3>Cantidad de adultos: {bookingInput.adults}</h3>
              <h3>Cantidad de niños: {bookingInput.childs}</h3>
              <h3>Cantidad de noches: {bookingInput.nightQuantity > 0 ?  bookingInput.nightQuantity : 1}</h3>
            </div>

            <div className="justify-end items-end text-end ">
              <div className="p-5 text-start  bg-white rounded-lg ">
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

            <div className="absolute bottom-0 right-[50%]">
              <h2>Precio total: {bookingInput.totalPrice}GS</h2>
              <button
                className="w-fit px-2 duration-300 text-[#B35642] bg-white  hover:bg-[#ec775f] hover:duration-300 py-2 rounded-lg font-bold my-1.5 mb-8 "
                type="button"
              >
                RESERVAR
              </button>
            </div>
          </div>
        </div>
      }
    </div>
  );
};
