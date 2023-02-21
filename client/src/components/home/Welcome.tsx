import React from "react";
import { SuperCarru } from "../customHooks/SuperCarru";
import fotoAncha1 from "../../assets/carretaAncho1.jpg";
import fotoAncha2 from "../../assets/carretaAncho2.jpg";
import laCarretaEntrada from "../../assets/entradaLaCarreta.jpg";
import laCarretaVistaVerde from "../../assets/laCarretaVistaVerde.jpg";
import laCarretaZonaVerde from "../../assets/laCarretaZonaVerde.jpg";
import laCarretaVistaPradera from "../../assets/laCarretaVistaPradera.jpg";
import laCarretaPorche from "../../assets/laCarretaPorche.jpg";
import laCarretaTerere from "../../assets/laCarretaTerere.jpg";
import laCarretaVacas from "../../assets/laCarretaVacas.jpg";
import fogonInsta from "../../assets/fogoninsta.jpg";
import useWindowSize from "../customHooks/useWindowSize";

export const Welcome = () => {
  const { width } = useWindowSize();

  const carroImage1 = [laCarretaTerere, laCarretaVacas, fogonInsta];
  const carroImage2 = [laCarretaVistaVerde, laCarretaZonaVerde, laCarretaPorche];

  const carroImageLarge = [laCarretaEntrada, laCarretaVistaPradera , fotoAncha1, fotoAncha2, ];

  return (
    <div className={` border-t-3 p-0  overflow-hidden ${width > 768 ? "welcomeS" : ""} `}>
      {width < 768 ? (
        <div className="h-full p-7 pt-6 tcw:h-full tcw:w-screen tcw:p-0 tcw:pt-20 tsw:pt-28 md:grid md:grid-cols-2 md:text-center md:justify-center ">
          <h2 className="text-[25px] text-[#B35642] text-center">
            Bienvenido a La Carreta
          </h2>
          <div className="text-center text-black">
            <p className="text-[18px] p-5 tcw:pt-14">
              Nos enfocamos en brindar un servicio y una experiencia de calidad de manera eficiente para hacer sentir a nuestros huéspedes como en casa, somos un oasis que tiene la mezcla perfecta entre naturaleza y confort para que puedas descansar en paz y olvidarte los problemas de la ciudad, también contamos con la mejor gastronomía típica del Paraguay en nuestro establecimiento.
            </p>
          </div>

        <div className="">
          <div className="tcw:pt-14">
            <div className="grid-cols-2 h-[280px] w-screen p-2 space-y-[6px] tcw:space-y-[3px] tsw:h-[350px] grid gap-2 grid-rows-2 items-center">
              <div className="w-full rounded border-2 border-[#B35642]">
                <SuperCarru
                  className="h-[130px] w-[144px] object-cover tcw:h-[130px] tcw:w-screen tsw:h-[150px]"
                  file={carroImage1}
                />
              </div>

              <div className="w-full col-span-1 row-span-2 rounded border-2 border-[#B35642] ">
                <SuperCarru
                  className="h-[270px] tcw:w-screen object-cover tsw:h-[325px]"
                  file={carroImageLarge}
                />
              </div>
              <div className="w-full rounded border-2 border-[#B35642]">
                <SuperCarru
                  className="h-[130px] w-[144px] object-cover tcw:h-[130px] tcw:w-screen rounded tsw:h-[150px]"
                  file={carroImage2}
                />
              </div>
            </div>
          </div>
          </div>

        </div>
      ) : (
        <div className=" top text-white bg-[#B35642] border-y-4 border-double  border-[#bf9a9a]   p-5 h-[800px] lg:p-8  z-50" >
          <h2 className="welcomeS animation text-[45px] text-center py-14 lg:py-10 rounded-lg" data-aos-duration="1400"  data-aos='zoom-in'>
            Bienvenido a La Carreta
          </h2>
          
          <div className=" grid grid-cols-2" data-aos-duration="1400"  data-aos='zoom-in'>
            <p className=" text-center md:text-[25px] p-5 pt-36 leading-8 lg:text-[30px] rounded-lg">
            Nos enfocamos en brindar un servicio y una experiencia de calidad de manera eficiente para hacer sentir a nuestros huéspedes como en casa, somos un oasis que tiene la mezcla perfecta entre naturaleza y confort para que puedas descansar en paz y olvidarte los problemas de la ciudad, también contamos con la mejor gastronomía típica del Paraguay en nuestro establecimiento.
            </p>
            <div className=" grid grid-cols-2 grid-rows-2 pt-14 p-3 lgg:p-10 rounded-lg">
              
            <div className=" w-full col-span-2 row-span-2 ">
                <SuperCarru
                  className="welcomeS h-[200px] w-screen object-cover rounded-xl border-2 border-white mt-5 mb-5 lg:h-[250px]"
                  file={carroImageLarge}
                />
              </div>
              <div className="w-full pr-1">
                <SuperCarru
                  className="welcomeS w-screen h-[200px] rounded-xl border-2 border-white object-cover lg:h-[230px]"
                  file={carroImage1}
                />
              </div>
              <div className="w-full pl-1">
                <SuperCarru
                  className="welcomeS w-screen rounded-xl h-[200px] border-2 border-white object-cover lg:h-[230px]"
                  file={carroImage2}
                />
              </div>
              
            </div>
          </div>

           
          </div>
      )}
    </div>
  );
};
