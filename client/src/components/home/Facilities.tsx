import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllFacilities } from "../../redux/slices/FacilitiesSlice/FacilitieAction";

export const Facilities = () => {

 const facilities = useAppSelector((state) => state.facilities.facilitiesList);
 const loading = useAppSelector((state) => state.facilities.loading);
 const dispatch = useAppDispatch();
 useEffect(() => {
    dispatch(getAllFacilities());
 }, [dispatch]);

    return ( 
        <div className="py-16 items-center justify-center text-center h-full w-full overflow-x-hidden" data-aos="zoom-out-up" data-aos-duration="2000" data-aos-easing="ease-in-out">
            <h2 className="text-[#E2725B]  text-center  text-[40px]">Instalaciones</h2>
        <div className={facilities.length ? "py-5 md:p-10 text-[#696969] grid grid-cols-3 " : "py-5 p-6 text-[#696969]  m-0" }>
                {
                    facilities.length ? facilities.slice(0, 6).map((e, index) => {
                        return (
                            <div className="m-auto pt-14 p-2 mb-60 w-[115px] h-[250px] md:w-[200px] md:h-[300px] md:mb-36 pb-20" key={e.id}>
                                <img className="welcomeS object-cover border-2 border-[#c59990]  rounded-[100%] w-full h-full " src={`${e.image}`} />
                                <h2 className="text-[23px] text-[#E2725B] pt-5">{e.name}</h2>
                                <p className="pt-5 text-[18px]">{e.description}</p>
                            </div>
                        )
                    })
                    
                    : loading ? (
                        <div className="text-black pt-36 mt-36 items-center justify-center text-center">
                        <svg
                          className="animate-spin h-5 w-5 m-auto bg-red-500 "
                          viewBox="0 0 24 24"
                        ></svg>
                        <h2>Cargando...</h2>
                      </div>
                      ) :
                    <div className=" text-[20px]  pt-14">
                    <p>No se encontraron instalaciones</p>
                    </div>
                }
                
        </div>
        <Link to="/aboutus">
        <button className="text-white border  rounded-lg bg-[#B35642] p-2 px-5 md:p hover:bg-opacity-[80%] shadow-lg shadow-[#5c5958] mt-20"> VER M??S???</button>
        </Link>
        </div>
    )
};