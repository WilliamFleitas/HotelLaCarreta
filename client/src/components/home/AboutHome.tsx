import React from "react";
import abus from "../../assets/abus.jpeg";
export const AboutHome = () => {
  return (
    <div className="text-white bg-[#B35642] p-8 lg:p-14  overflow-x-hidden shadow-lg shadow-[#4d4a4a] border-2 border-double border-[#929290]">
      <h2
        className="text-[35px] pt-8 "
        data-aos-duration="1400"
        data-aos="zoom-in"
      >
        Sobre nosotros
      </h2>
      <p
        className="text-[25px] pt-8 md:leading-10"
        data-aos-duration="1400"
        data-aos="zoom-in"
      >
        Somos una posada que tiene más de 5 años en el rubro, nos destacamos por
        ofrecer a nuestros clientes un lugar en donde pueden olvidarse del mundo
        mientras descansan en medio de la naturaleza pero siempre con el máximo
        confort. Contamos con 7 habitaciones equipadas con todo lo que se
        necesita para tener una estadía placentera además de 19 hectáreas de
        campo con sus respectivas actividades para disfrutar de la forma que
        quieras!
      </p>

      <div className="space-y-2" data-aos-duration="1400" data-aos="zoom-in">
        <div className=" grid grid-cols-2  pt-8 ">
          <div className="pl-5 pt-5 ">
            <h2 className="pb-5 text-[35px]">Nuestra historia</h2>
            <p className="text-[25px] leading-8">
              Luego de más de 30 años de vivir en Argentina decidimos apostar a
              nuestro país. Posada rural La Carreta empezó como un proyecto
              familiar en nuestra casa de campo ubicada en nuestro pueblo natal
              en la compañía de San Juan Potrero, Misiones. En marzo del 2019
              luego de un intenso trabajo pasamos a formar parte de la red de
              Posadas Turísticas del Paraguay de la SENATUR. A partir de ahí
              comenzamos a dar nuestros primeros pasos con la convicción de
              seguir creciendo y consolidarnos en el rubro.
            </p>
          </div>
          <img
            className="rounded-lg shadow-lg shadow-[#4d4a4a] border-2 border-double border-[#9e7e7e] m-auto"
            src={abus}
            alt={abus}
          />
        </div>

        <div className="grid grid-cols-2  pt-8 ">
          <img
            className="rounded-lg shadow-lg shadow-[#4d4a4a] border-2 border-double border-[#9e7e7e] m-auto"
            src={abus}
            alt={abus}
          />
          <div className="pl-5 pt-5 ">
            <h2 className="pb-5 text-[35px]">Nuestra misión</h2>
            <p className="text-[25px] leading-8">
              Nuestra misión es la de brindar un servicio de calidad, ofreciendo
              una atención personalizada con el fin de dar a los clientes una
              experiencia más humana, más cálida y más única. Crecemos y
              avanzamos buscando ser autosustentables en armonía con la
              naturaleza. Promovemos la cultura del país y de la comunidad a
              través de nuestros servicios.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
