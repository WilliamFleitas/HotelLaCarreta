import React, { useEffect, useState } from "react";
import fachada from "../../assets/fachadaposada.jpeg";
import vAerea from "../../assets/vistaaerea.png";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllFacilities } from "../../redux/slices/FacilitiesSlice/FacilitieAction";
import proyRural from "../../assets/misionLacarreta.png";
import proyIntercambio from "../../assets/proyintercambio.jpg";
import useWindowSize from "../customHooks/useWindowSize";

export const AboutUs = () => {
  const facilities = useAppSelector((state) => state.facilities.facilitiesList);
  const dispatch = useAppDispatch();
  const [facilitiesDiv, setFacilitiesDiv] = useState(false);
  useEffect(() => {
    dispatch(getAllFacilities());
  }, [dispatch]);
  const handleFacilDiv = () => {
    facilitiesDiv ? setFacilitiesDiv(false) : setFacilitiesDiv(true);
  };
  const { width } = useWindowSize();
  return (
    <div
      className="text-[#696969] pt-6 text-center justify-center items-center  p-5 overflow-clip tsw:p-14 md:mt-14 aser:pt-14"
      data-aos-duration="900"
      data-aos-easing="ease-in-out"
      data-aos="zoom-in"
    >
      <h2 className="text-[23px] text-[#E2725B] md:text-[26px] aser:text-[35px] lg:text-[40px]  ggg:text-[48px] ">
        Sobre nosotros
      </h2>

      <div className=" p-5 md:grid md:grid-cols-2 md:p-8 h-full w-full md:space-x-5 lg:pt-24">
        <img
          className="border border-[#929290] rounded-lg  md:m-auto items-center justify-center shadow-lg shadow-black"
          src={fachada}
          alt={fachada}
        />
        <p className="text-center md:text-start pt-8 md:pt-[0px] md:leading-[30px] text-[18px] md:text-[24px] aser:text-[28px] lg:text-[34px] lg:pt-[4px] ggg:text-[38px] ggg:leading-[40px]">
          Somos una posada que tiene más de 5 años en el rubro, nos destacamos
          por ofrecer a nuestros clientes un lugar en donde pueden olvidarse del
          mundo mientras descansan en medio de la naturaleza pero siempre con el
          máximo confort. Contamos con 7 habitaciones equipadas con todo lo que
          se necesita para tener una estadía placentera además de 19 hectáreas
          de campo con sus respectivas actividades para disfrutar de la forma
          que quieras!.
        </p>
      </div>

      <div className="pt-10 p-5">
        <h2 className="text-[23px] text-[#E2725B] pb-8 md:text-[26px] aser:text-[35px] lg:text-[40px]  ggg:text-[48px] ">
          Vista Aerea
        </h2>
        <div className="justify-center items-center align-center ">
          <img
            className=" border border-[#929290] rounded-md md:w-screen shadow-lg w-full shadow-black"
            src={vAerea}
            alt={vAerea}
          />
        </div>
      </div>

      <div className="pt-10">
        <div className=" text-white text-[25px] pt-7 bg-[#B35642] h-full  w-screen text-center p-5 object-fit border-[1px] border-[#929290] shadow-lg shadow-black ">
          <h2
            data-aos-duration="900"
            data-aos-easing="ease-in-out"
            data-aos="zoom-in"
          >
            Posada La Carreta
          </h2>
          <div
            className="text-[15px] pt-5 space-y-5 md:grid md:grid-cols-3 md:space-y-0 "
            data-aos-duration="900"
            data-aos-easing="ease-in-out"
            data-aos="zoom-in"
          >
            <div>
              <label>Visión</label>
              <p>
                Nuestra visión es la de convertirnos en una posada de
                referencia, destacada y reconocida en nuestro país por nuestro
                buen servicio, confort y atención. Además de seguir con el
                enfoque de mantener las zonas verdes adyacentes.
              </p>
            </div>
            <div>
              <label>Misión</label>
              <p>
                Nuestra misión es la de brindar un servicio de calidad,
                ofreciendo una atención personalizada con el fin de dar a los
                clientes una experiencia más humana, más cálida y más única.
                Crecemos y avanzamos buscando ser autosustentables en armonía
                con la naturaleza.
              </p>
            </div>

            <div>
              <label>Valores</label>
              <p>
                Mostramos predisposición y voluntad para detectar las
                necesidades de nuestros clientes y resolver conflictos de manera
                eficiente minimizando posibles impactos negativos.
              </p>
            </div>
          </div>
        </div>
      </div>

      <section id="facilitiesDiv"></section>
      <div className="pt-14 " onClick={() => handleFacilDiv()}>
        <h2 className="text-[23px] text-start text-[#E2725B] pt-14 pl-5 hover:opacity-[70%] mb-14 md:text-[40px]">
          {" "}
          {"> Instalaciones"}
        </h2>
        <div
          className={
            "  text-[#696969]  items-center justify-center text-start border-t-4 pt-0 mt-8 md:grid md:grid-cols-3 md:text-center md:border-none md:bg-[#B35642]"
          }
        >
          {width < 768 ? (
            facilitiesDiv ? (
              facilities.length ? (
                facilities.map((e, index) => {
                  return (
                    <div
                      className="border-b-4 w-screen p-5 grid grid-cols-2 md:grid-cols-1 items-center justify-center space-x-5 md:w-full md:flex md:flex-col-reverse"
                      key={e.id}
                    >
                      <div className="">
                        <h2 className=" text-[#E2725B]  text-[23px] pb-3 md:order-last">
                          {e.name}
                        </h2>
                        <p className="text-black md:order-3">{e.description}</p>
                      </div>

                      <div>
                        <img
                          className="rounded-lg border border-[#B35642] md:order-1"
                          src={e.image}
                          alt={e.image}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className=" text-[20px]  pt-14">
                  <p>No se encontraron instalaciones</p>
                </div>
              )
            ) : (
              <></>
            )
          ) : facilitiesDiv ? (
            facilities.length ? (
              facilities.map((e, index) => {
                return (
                  <div
                    className="border p-5  items-center justify-center space-x-5 w-full h-full text-white"
                    key={e.id}
                  >
                    <div className="">
                      <h2 className="   text-[23px] pb-5 ">{e.name}</h2>
                      <img
                        className="rounded-lg border m-auto border-white w-[200px] h-[150px]"
                        src={e.image}
                        alt={e.image}
                      />
                      <p className="  pt-5">{e.description}</p>
                    </div>

                    <div></div>
                  </div>
                );
              })
            ) : (
              <div className=" text-[20px]  pt-14">
                <p>No se encontraron instalaciones</p>
              </div>
            )
          ) : (
            <></>
          )}
          {facilitiesDiv ? (
            <div className="border w-full h-full p-6 justify-center  text-center items-center ">
              <div className="text-[#E2725B] bg-white border border-[#E2725B]">
                <h3>Más actualizaciones proximamente!</h3>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
        <section id="proyChange"></section>
        <div className="mb-10 mt-14 p-5  md:p-8 h-full w-full  border-2 pt-14 border-[#929290] bg-zinc-800 shadow-md  shadow-black text-white pb-14">
          <h2 className="text-[30px] text-[#E2725B] md:text-[26px] aser:text-[35px] lg:text-[40px]  ggg:text-[48px] ">
            Proyecto intercambio
          </h2>
          <div className="md:grid md:grid-cols-2 md:p-5 md:space-x-5 ">
            <p className="text-center  text-[18px] md:text-[24px] aser:text-[28px] lg:text-[34px]  ggg:text-[38px] ggg:leading-[40px] m-auto">
              Mediante el proyecto de intercambio te damos la oportunidad de
              vivir la experiencia del campo, te dejamos unirte a nosotros como
              trabajadores para hacer los diferentes quehaceres rurales y a cambio te damos la estadía completa en la posada sin costo alguno.
            </p>
            <img
              className="border border-[#B35642] rounded-lg mt-8 min-h-[400px] m-auto"
              src={proyIntercambio}
              alt={proyIntercambio}
            />
          </div>
          <section id="proyRural"></section>
        </div>

        <div className=" p-5 md:p-8 h-full w-full  pt-14 border-2 border-[#929290] bg-zinc-800 shadow-md  shadow-black text-white pb-14">
          <h2 className="text-[30px] text-[#E2725B] md:text-[26px] aser:text-[35px] lg:text-[40px]  ggg:text-[48px] ">
            Proyecto rural
          </h2>
          <div className="md:grid md:grid-cols-2 md:p-5 md:space-x-5 ">
            <p className="text-center pt-8 md:pt-[5px] text-[18px] md:text-[24px] aser:text-[28px] lg:text-[34px] ggg:text-[38px] ggg:leading-[40px]">
            La Carreta pretende ser una Posada Turística autosustentable y autosostenible con el tiempo, a través de la
producción orgánica de los alimentos (frutas, hortalizas) y el cuidado del Medio Ambiente a través de uso
racional de agua, suelo, energía y materia orgánica con enfoque de economía circular de esa manera a contribuir
en la reducción de huellas de carbono. 
            </p>
            <img
              className="border border-[#B35642] rounded-lg min-h-[400px] m-auto"
              src={proyRural}
              alt={proyRural}
            />
            
          </div>
          <p className="text-center pt-8 md:pt-[10px] text-[18px] md:text-[24px] aser:text-[28px] lg:text-[34px] ggg:text-[38px] ggg:leading-[40px]">En este contexto “La Carreta” ya viene trabajando desde hace casi 4 años
en la implementación de Huerta Orgánica, principalmente en la plantación de frutas, recuperación de suelo,
práctica de rotación de cultivos y utilización de abono orgánico, generando fuentes de trabajos en la comunidad.
La Carreta lleva adelante un programa denominado “HUELLA VERDE” donde los huéspedes de la Posada Rural
que traen mudas forestales nativas se le hace un descuento por su estadía y plantan en el establecimiento con
cartel puesto fecha y nombre del huésped. Igualmente quiere contribuir a mantener en el tiempo la Tradicion
Misionera y a través de ella sobre la conciencia de la necesidad de conservar la Huella Jesuitica en la región,
incluida el proyecto “Camino de los Jesuitas” en Sudamerica desarrollado con el Apoyo del BID (Banco
Interamericano de Desarrollo)que es un Proposito Multidestino, compartido por Argentina, Bolivia Brasil,
Uruguay y Paraguay</p>
        </div>
      </div>
    </div>
  );
};
