import React, { useEffect } from "react";
import type { DatePickerProps } from 'antd';
import { DatePicker, Space } from 'antd';
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllRooms } from "../../redux/slices/RoomSlice/RoomAction";

const { RangePicker } = DatePicker;
const dateFormat = "YYYY/MM/DD";

export const Check = () => {

    const rooms = useAppSelector((state) => state.rooms.roomList);
    console.log(rooms);
    const dispatch = useAppDispatch();

    const disabledDate: any = (current: any) => {
        
        return (
          (current && current <= dayjs().startOf("hour"))
        );
      };
    
    const onChangeDate: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(dateString);
        const bookIn = dayjs(dateString).format('YYYY-MM-DDTHH:mm:ssZ[Z]');
        console.log("bookin", bookIn);
      };
    

      
      useEffect(() => {
        dispatch(getAllRooms())
    }, []);

    return (
        <div className="md:pb-24 md:pt-8 lg:pt-0 text-center items-center justify-center overflow-x-hidden">
            <div className="bg-[#B35642] h-[300px] md:h-[240px] md:rounded-lg md:w-[650px]  w-screen text-center pt-10 object-fit border-[1px] border-[#D3B616] tcw:h-[300px] tcw:w-screen xl:h-[240px] 3x1:w-[80rem]">
            <h3>Check in y check out acaasdas</h3>

            <div>
          <h3 className="text-[#B35642] text-[24px]">Check In/Check Out</h3>
          <div className="">
            <DatePicker
              disabledDate={disabledDate}
              format={dateFormat}
              onChange={onChangeDate}
              id="checkIn"
              className="p-3 border-2 shadow-md shadow-[#B35642] border-[#B35642] hover:border-[#B35642] font-bold text-[#c7cbce]"
            />
          </div>
        </div>

            </div>
            
        </div>
    )

};