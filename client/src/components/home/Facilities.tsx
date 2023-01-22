import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllFacilities } from "../../redux/slices/FacilitiesSlice/FacilitieAction";

export const Facilities = () => {

 const facilities = useAppSelector((state) => state.facilities.facilitiesList);
 const dispatch = useAppDispatch();
 useEffect(() => {
    dispatch(getAllFacilities());
 }, [dispatch]);

    return ( 
        <div className="py-16 items-center justify-center text-center h-full">
            <h2 className="text-[#E2725B]  text-center  text-[40px]">Instalaciones</h2>
        <div className={facilities.length ? "py-5 p-6 text-[#696969] grid grid-cols-3  items-center justify-center text-center h-full " : "py-5 p-6 text-[#696969]  items-center justify-center text-center h-full " }>
                {
                    facilities.length ? facilities.slice(0, 6).map((e, index) => {
                        return (
                            <div className="pt-10 p-5" key={e.id}>
                                <img className="ml-[11px] rounded-[100%] h-[180px] w-[180px] object-cover border border-[#d3553b] aser:w-[150px] aser:ml-11 aser:m-0 aser:h-[150px] lg:ml-0 lg:w-screen lg:h-[270px] lgg:ml-11 lgg:w-[250px] lgg:h-[250px] xl:ml-16 1xl:ml-20" src={`${e.image}`} />
                                <h2 className="text-[23px] text-[#E2725B] pt-5">{e.name}</h2>
                                <p className="pt-5 text-[18px]">{e.description}</p>
                            </div>
                        )
                    })
                    
                    :
                    <div className=" text-[20px]  pt-14">
                    <p>No se encontraron instalaciones</p>
                    </div>
                }
                
        </div>
        <button className="text-white mt-10 rounded-lg bg-[#B35642] p-3 h-full w-[150px]"> VER MÁS➜</button>
        </div>
    )
};