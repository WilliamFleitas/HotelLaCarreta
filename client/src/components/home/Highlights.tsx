import React from "react";
import useWindowSize from "../customHooks/useWindowSize";

export const Highlights = () => {
  const { width } = useWindowSize();

  return (
    <div className="overflow-x-hidden">
      {width < 768 ? (
        <div className="pt-10">
          <div className=" text-white text-[25px] pt-7 bg-[#B35642] h-full  w-screen text-center p-5 object-fit border-[1px] border-[#D3B616]">
            <h2>Aspectos destacados</h2>
            <div className="text-[15px] pt-5 space-y-5">
              <p>
                Además de ofrecer una hermosa estadía nos identificamos por
                ofrecer un servicio diferencial, incluyendo en nuestras comidas
                productos frescos de nuestra granja y huerta orgánica.
                Actualmente también comercializamos los productos de la granja
                ofreciendo siempre la mejor calidad posible.
              </p>
              <p>
                Nuestra posada cuenta con el sello de calidad de la
                SENATUR(Secretaria Nacional de Turismo de Paraguay), además de
                estar vinculada a la organización de las Posadas Turísticas del
                Paraguay
              </p>
              <p>
                Nuestro alojamiento cuenta con actividades recreativas como
                también vivir la experiencia del campo, además de dar
                alojamiento y reservas para eventos también contamos con un
                programa de intercambio, si te gusta el campo y querés saber más
                sobre el trabajo en él te damos la oportunidad de trabajar con
                nosotros a cambio de alojamiento
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-[#696969] text-center justify-center p-5 pt-24 lg:p-14 ">
          <h2 className="text-[35px] pt-8 pb-10 text-[#E2725B]">
            Aspectos destacados
          </h2>

          <div className="grid grid-cols-3 p-5 gap-3 text-[24px] lg:gap-4">
            <p>
              Además de ofrecer una hermosa estadía nos identificamos por
              ofrecer un servicio diferencial, incluyendo en nuestras comidas
              productos frescos de nuestra granja y huerta órganica. Actualmente
              también comercializamos los productos de la granja ofreciendo
              siempre la mejor calidad posible.
            </p>
            <p>
              Nuestra posada cuenta con el sello de calidad de la
              SENATUR(Secretaria Nacional de Turismo de Paraguay), además de
              estar vinculada a la organización de las Posadas Turisticas del
              Paraguay
            </p>
            <p>
              Nuestro alojamiento cuenta con actividades recreativas como
              también vivir la experiencía del campo, ademas de dar alojamiento
              y reservas para eventos también contamos con un programa de
              intercambio, si te gusta el campo y queres saber más sobre el
              trabajo en el te damós la oportunidad de trabajar con nosotros a
              cambio de alojamiento
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
