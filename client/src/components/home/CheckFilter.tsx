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
    setCheckFilters({...checkFilters, date: dateString});
  };
  
  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const roomTypeVar = e.target.value as "Rustica" | "Moderna" | "";
      setCheckFilters({...checkFilters, roomType: roomTypeVar});
  };


  const handleCheck = () => {
    dispatch(setCheckFiltersAction(checkFilters.date, checkFilters.roomType));
    navigate("/rooms");
    
  };
  

  useEffect(() => {
    dispatch(getAllRooms(filters.date, filters.roomType));
  }, [dispatch]);

  return (
    <div className="text-center items-center justify-center md:flex md:text-center md:items-center md:justify-center md:overflow-x-hidden md:shadow-md md:border-t-2 md:border-[#c7c3c3] md:shadow-[#4a4949]">
      <div className=" bg-[#B35642] w-screen  h-full md:text-center md:justify-center md:items-center p-5" data-aos-delay="50" >
        <h3 className="animation md:text-[3vh] text-[25px] md:text-white" data-aos-duration="900" data-aos-easing="ease-in-out" data-aos='zoom-in'>Revisar disponibilidad de habitaciones</h3>

        <div className="animation md:flex md:flex-row md:text-center md:justify-center md:items-center text-[18px] md:text-[#B35642] font-bold" data-aos-duration="900" data-aos-easing="ease-in-out" data-aos='zoom-in'>

          <div>
            <div className="text-center items-center justify-center " >
              <h2 className="md:text-white pt-4 md:pt-0 ">Elegir fecha</h2>
              <DatePicker
                disabledDate={disabledDate}
                format={dateFormat}
                onChange={onChangeDate}
                id="checkIn"
                className="p-2 mt-4  md:mt-0 md:p-3 border-2 shadow-inner shadow-[#d7d4d4] border-[#acabab] hover:border-[#6c6b6b] font-bold text-[#c7cbce]"
              />
            </div>
          </div>

          <div className="p-5">
          <h2 className="md:text-white ">Elegir Zona de la habitación</h2>
            <select
            className="p-1 mt-5 md:mt-0 m-auto md:p-3 border-2 shadow-inner shadow-[#d7d4d4] border-[#d3d2d2] hover:border-[#6c6b6b] min-w-[80px] md:w-[190px] font-medium text-[#c7cbce] rounded-md text-start justify-start items-start " onChange={(e) => onChangeSelect(e)}
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
          
          <div className="md:pl-16 md:pt-7">
            <button className="bg-white p-1 md:p-2 rounded-lg shadow-md text-[#E2725B] shadow-[#7d7b7b] border-[#d3d2d2] hover:border-[#6c6b6b] " onClick={() => handleCheck()}>Buscar ➜</button>
          </div>
        </div>

      </div>
    </div>
  );
};
