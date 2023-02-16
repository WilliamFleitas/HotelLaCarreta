import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllFacilities } from "../../redux/slices/FacilitiesSlice/FacilitieAction";

export const Facilities = () => {

 const facilities = useAppSelector((state) => state.facilities.facilitiesList);
 const dispatch = useAppDispatch();
 useEffect(() => {
    dispatch(getAllFacilities());
 }, [dispatch]);

    return ( 
        <div className="py-16 items-center justify-center text-center h-full w-full overflow-x-hidden">
            <h2 className="text-[#E2725B]  text-center  text-[40px]">Instalaciones</h2>
        <div className={facilities.length ? "py-5 p-10 text-[#696969] grid grid-cols-3 " : "py-5 p-6 text-[#696969]  m-0" }>
                {
                    facilities.length ? facilities.slice(0, 6).map((e, index) => {
                        return (
                            <div className="m-auto pt-14 p-5 mb-14 w-[200px] h-[300px] pb-20" key={e.id}>
                                <img className=" object-cover border border-[#d3553b]  rounded-[100%] w-full h-full" src={`${e.image}`} />
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
        <Link to="/aboutus">
        <button className="text-white mt-10 rounded-lg bg-[#B35642] p-3 h-full w-[150px] hover:bg-opacity-[80%]"> VER MÁS➜</button>
        </Link>
        </div>
    )
};