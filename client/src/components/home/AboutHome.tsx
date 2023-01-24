import React from "react";
import abus from "../../assets/abus.jpeg"
export const AboutHome = () => {

    return (
        <div className="text-white bg-[#B35642] p-8 lg:p-14  overflow-x-hidden">
            <h2 className="text-[35px] pt-8 ">Sobre nosotros</h2>
            <p className="text-[20px] pt-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore debitis autem sequi corporis incidunt, ea asperiores et quisquam deleniti aut possim</p>

            <div className="space-y-2">

            <div className="grid grid-cols-2  pt-8 ">
               <img className="rounded-lg" src={abus} alt={abus}/>
               <div className="pl-5 pt-5">
               <h2 className="pb-5 text-[35px]">Nuestra historia</h2>
               <p className="text-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam corporis saepe, voluptates doloribus, explicabo reiciendis quia ad natus quibusdam quidem tempora enim. Quam ten</p>
               </div>
            </div>

            <div className="grid grid-cols-2  pt-8 ">
            <div className="pr-5 pt-5">
               <h2 className="pb-5 text-[35px]">Nuestra misión</h2>
               <p className="text-[18px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam corporis saepe, voluptates doloribus, explicabo reiciendis quia ad natus quibusdam quidem tempora enim. Quam ten</p>
               </div>
               <img className="rounded-lg" src={abus} alt={abus}/>
               
            </div>
            

            </div>
            
        </div>
    )
};