import React from "react";
import { DatePicker, Space } from "antd";
import { format } from "date-fns";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

export const CheckRoom = () => {
  const { RangePicker } = DatePicker;
  const dateFormat = "DD/MM/YYYY";

  const handleRangePicker = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
    dateString: [string, string] | string
  ) => {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
  };

  return (
    <div className="text-black text-center items-center justify-center" >
      <h2>Reservas</h2>
      <div className="flex flex-row justify-center p-5 space-x-3">
        <div>
          <h3>Check In</h3>
          <Space direction="vertical" size={51} className="">
            <RangePicker format={dateFormat} onChange={handleRangePicker} />
          </Space>  
        </div>

        <div>
          <h3>Guest</h3>

          <div className="flex flex-row  space-x-3">
            <div>
              <h3>Adultos</h3>
            </div>

            <div>
              <button>+</button>
              <label>{0}</label>
              <button>-</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
