import React from "react";
import { SuperCarru } from "../customHooks/SuperCarru";
import foto1 from "../../assets/carreta1.jpg"
import foto2 from "../../assets/carreta2.jpg"
import foto3 from "../../assets/carreta3.jpg"
import fotoAncha1 from "../../assets/carretaAncho1.jpg"
import fotoAncha2 from "../../assets/carretaAncho2.jpg"


export const Welcome = () => {


    const carroImage = [
        foto1,
        foto2,
        foto3,
        
    ];

    const carroImageLarge = [
        fotoAncha1,
        fotoAncha2,
    ]


  return (
    <div className="h-[530px] p-7 pt-6 roun">
      <div className="text-center text-[#B35642]">
        <h2 className="text-[25px]">Bienvenido a La Carreta</h2>
        <p className="text-[15px] p-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
          exercitationem officiis voluptatum hic similique tempore quasi, facere
          cumque, unde maiores placeat repellendus voluptas consequatur labore
          assumenda, sunt optio? Eius, distinctio.
        </p>
      </div>
       <div className="">
        <div className="grid-cols-2 h-[280px] w-screen p-2 space-y-[6px] grid gap-2 grid-rows-2 items-center">
           
         <div className="w-full rounded border-2 border-[#B35642]">
                <SuperCarru className="h-[130px] w-[144px] " file={carroImage} />
          </div>
          
          <div className="w-full col-span-1 row-span-2 rounded border-2 border-[#B35642] ">
          <SuperCarru className="h-[270px] " file={carroImageLarge} />
            
          </div>
          <div className="w-full rounded border-2 border-[#B35642]">
          <SuperCarru className="h-[130px] w-[144px] rounded" file={carroImage} />
            
          </div>
          
          
        </div>
      </div>
    </div>
  );
};
