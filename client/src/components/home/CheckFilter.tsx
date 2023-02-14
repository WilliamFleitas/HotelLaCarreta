import React, { useEffect, useState } from "react";
import type { DatePickerProps } from "antd";
import { DatePicker, Space } from "antd";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { getAllRooms, setCheckFiltersAction } from "../../redux/slices/RoomSlice/RoomAction";
import { checkType } from "../../redux/slices/RoomSlice";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";


export const CheckFilter = () => {
  const rooms = useAppSelector((state) => state.rooms.roomList);
  const filters = useAppSelector((state) => state.rooms.checkFilters);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const disabledDate: any = (current: any) => {
    return current && current <= dayjs().startOf("hour");
  };

  const [checkFilters, setCheckFilters] = useState<checkType>({
    date: "",
    roomType: ""
  })

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    
    const bookIn = dayjs(dateString).format("YYYY-MM-DDTHH:mm:ssZ[Z]");
    
    setCheckFilters({...checkFilters, date: dateString});
  };
  
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
      const roomTypeVar = e.target.value as "Rustica" | "Moderna" | "";
      setCheckFilters({...checkFilters, roomType: roomTypeVar});
  };


  const handleCheck = () => {
    
    console.log(checkFilters);
    dispatch(setCheckFiltersAction(checkFilters.date, checkFilters.roomType));
    navigate("/rooms");
    
  };

  useEffect(() => {
    dispatch(getAllRooms(filters.date, filters.roomType));
  }, [dispatch]);

  return (
    <div className="flex text-center items-center justify-center overflow-x-hidden">
      <div className="bg-[#B35642] w-screen  h-full text-center- justify-center items-center p-5">
        <h3 className="text-[2.5vh] text-white">Revisar disponibilidad de habitaciones</h3>

        <div className="flex flex-row text-center justify-center items-center text-[18px] text-[#B35642] font-bold">

          <div>
            <div className="">
              <h2 className="text-white">Elegir fecha</h2>
              <DatePicker
                disabledDate={disabledDate}
                format={dateFormat}
                onChange={onChangeDate}
                id="checkIn"
                className="p-3 border-2 shadow-md shadow-[#B35642] border-[#B35642] hover:border-[#B35642] font-bold text-[#c7cbce]"
              />
            </div>
          </div>

          <div className="p-5">
          <h2 className="text-white">Elegir Zona de la habitación</h2>
            <select
            className="p-3 border-2 shadow-md shadow-[#B35642] border-[#B35642] hover:border-[#B35642] w-[190px] font-medium text-[#c7cbce] rounded-md text-center justify-center items-center " onChange={(e) => onChangeSelect(e)}
            >
          <option className="" value="">
          Todas
          </option>
          <option className="" value="Rustica">
          Rustica
          </option>
          <option className="" value="Moderna">
          Moderna
          </option>
            </select>
          </div>
          
          <div className="pl-16 pt-7">
            <button className="bg-white p-2 rounded-lg" onClick={() => handleCheck()}>Buscar ➜</button>
          </div>
        </div>

      </div>
    </div>
  );
};
