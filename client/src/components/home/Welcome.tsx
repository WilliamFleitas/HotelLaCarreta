import React from "react";
import { SuperCarru } from "../customHooks/SuperCarru";
import foto1 from "../../assets/carreta1.jpg";
import foto2 from "../../assets/carreta2.jpg";
import foto3 from "../../assets/carreta3.jpg";
import fotoAncha1 from "../../assets/carretaAncho1.jpg";
import fotoAncha2 from "../../assets/carretaAncho2.jpg";
import useWindowSize from "../customHooks/useWindowSize";

export const Welcome = () => {
  const { width } = useWindowSize();

  const carroImage = [foto1, foto2, foto3];

  const carroImageLarge = [fotoAncha1, fotoAncha2];

  return (
    <>
      {width < 768 ? (
        <div className="h-[530px] p-7 pt-6 tcw:h-[600px] tcw:w-full tcw:p-0 tcw:pt-20 tsw:pt-28 md:grid md:grid-cols-2 md:text-center md:justify-center ">
          <h2 className="text-[25px] text-black text-center">
            Bienvenido a La Carreta
          </h2>
          <div className="text-center text-[#B35642]">
            <p className="text-[15px] p-5 tcw:pt-14">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
              exercitationem officiis voluptatum hic similique tempore quasi,
              facere cumque, unde maiores placeat repellendus voluptas
              consequatur labore assumenda, sunt optio? Eius, distinctio.
            </p>
          </div>

          <div className="tcw:pt-14">
            <div className="grid-cols-2 h-[280px] w-screen p-2 space-y-[6px] tcw:space-y-[3px] tsw:h-[350px] grid gap-2 grid-rows-2 items-center">
              <div className="w-full rounded border-2 border-[#B35642]">
                <SuperCarru
                  className="h-[130px] w-[144px] tcw:h-[130px] tcw:w-screen tsw:h-[150px]"
                  file={carroImage}
                />
              </div>

              <div className="w-full col-span-1 row-span-2 rounded border-2 border-[#B35642] ">
                <SuperCarru
                  className="h-[270px] tcw:w-screen tsw:h-[325px]"
                  file={carroImageLarge}
                />
              </div>
              <div className="w-full rounded border-2 border-[#B35642]">
                <SuperCarru
                  className="h-[130px] w-[144px] tcw:h-[130px] tcw:w-screen rounded tsw:h-[150px]"
                  file={carroImage}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-white bg-[#B35642] p-5 h-[800px] lg:p-8">
          <h2 className="text-[45px] text-center py-14 lg:py-10">
            Bienvenido a La Carreta
          </h2>
          
          <div className="grid grid-cols-2">
            <p className="text-[25px] text-center p-5 pt-36 leading-8 lg:text-[30px]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempora
              exercitationem officiis voluptatum hic similique tempore quasi,
              facere cumque, unde maiores placeat repellendus voluptas
              consequatur labore assumenda, sunt optio? Eius, distinctio.
            </p>
            <div className=" grid grid-cols-2 grid-rows-2 pt-14 p-3 lgg:p-10">
              
            <div className="w-full col-span-2 row-span-2 ">
                <SuperCarru
                  className="h-[200px] w-screen object-cover rounded-xl border-2 border-white mt-5 mb-5 lg:h-[250px]"
                  file={carroImageLarge}
                />
              </div>
              <div className="w-full pr-1">
                <SuperCarru
                  className="w-screen h-[200px] rounded-xl border-2 border-white object-cover lg:h-[230px]"
                  file={carroImage}
                />
              </div>
              <div className="w-full pl-1">
                <SuperCarru
                  className="w-screen rounded-xl h-[200px] border-2 border-white object-cover lg:h-[230px]"
                  file={carroImage}
                />
              </div>
              
            </div>
          </div>

           
          </div>
      )}
    </>
  );
};
