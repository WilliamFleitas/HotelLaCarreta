import React, { useEffect, useState } from "react";
import fachada from "../../assets/fachadaposada.jpeg"
import vAerea from "../../assets/vistaaerea.png"
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllFacilities } from "../../redux/slices/FacilitiesSlice/FacilitieAction";
import useWindowSize from "../customHooks/useWindowSize";

export const AboutUs = () => {

    const facilities = useAppSelector((state) => state.facilities.facilitiesList);
    const dispatch = useAppDispatch();
    const [facilitiesDiv, setFacilitiesDiv] = useState(false);
    useEffect(() => {
       dispatch(getAllFacilities());
    }, [dispatch]);
    const handleFacilDiv = ( ) => {
        facilitiesDiv ? setFacilitiesDiv(false) : setFacilitiesDiv(true);
    };
    const {width} = useWindowSize();
    return (
        <div className="text-black pt-6 text-center justify-center items-center  p-5 overflow-clip tsw:p-14 md:pt-20 aser:pt-24">
            
            <h2 className="text-[23px] text-[#B35642] md:text-[26px] aser:text-[35px] lg:text-[40px]  ggg:text-[48px] ">Sobre nosotros</h2>

            <div className=" p-5 md:grid md:grid-cols-2 md:p-8 h-full w-full md:space-x-5">
                <img className="border border-[#B35642] rounded-lg mt-8" src={fachada} alt={fachada}/>
                <p className="text-center pt-8 md:pt-[15%] text-[18px] md:text-[24px] aser:text-[28px] lg:text-[34px] lg:pt-[20%] ggg:text-[38px] ggg:leading-[40px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi, deserunt minus hic voluptate soluta praesentium laborum harum voluptas dolorem amet possimus sapiente dolores! Officia voluptates dolores, tempore cum quidem incidunt.</p>
            </div>

            <div className="pt-10 p-5" >
                <h2 className="text-[23px] text-[#B35642] pb-8 md:text-[26px] aser:text-[35px] lg:text-[40px]  ggg:text-[48px] ">Vista Aerea</h2>
                <div className="justify-center items-center align-center ">
                <img className=" border border-[#B35642] rounded-lg md:w-screen" src={vAerea} alt={vAerea}/> 
                </div>
            </div>

            <div className="pt-10">
            <div className=" text-white text-[25px] pt-7 bg-[#B35642] h-full  w-screen text-center p-5 object-fit border-[1px] border-[#D3B616] ">
            <h2>Nuestra misión</h2>
            <div className="text-[15px] pt-5 space-y-5 md:grid md:grid-cols-3 md:space-y-0 ">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia dolorem, eius dignissimos quidem, magnam quae ut perspiciatis minima nobis pariatur, a obcaecati numquam molestiae saepe nihil sit natus quisquam hic.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur fugiat laboriosam beatae odio in consectetur, perferendis inventore rerum eligendi maiores eveniet ut cum deserunt blanditiis sequi expedita impedit, aspernatur delectus.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur fugiat laboriosam beatae odio in consectetur, perferendis inventore rerum eligendi maiores eveniet ut cum deserunt blanditiis sequi expedita impedit, aspernatur delectus.</p>
            </div>
            
            </div>
           
        </div> 
            
         <section id="facilitiesDiv"></section>
            <div className="pt-14 " onClick={() => handleFacilDiv()}>
            <h2 className="text-[23px] text-start text-[#B35642] pt-14 pl-5 hover:opacity-[70%] mb-14 md:text-[40px]" > {"> Instalaciones"}</h2> 
            <div className={"  text-[#696969]  items-center justify-center text-start border-t-4 pt-0 mt-8 md:grid md:grid-cols-3 md:text-center md:border-none md:bg-[#B35642]" }>
            
                
            
                {
                  width < 768 ?  facilitiesDiv ? facilities.length ? facilities.map((e, index) => {
                        return (
                            <div className="border-b-4 w-screen p-5 grid grid-cols-2 md:grid-cols-1 items-center justify-center space-x-5 md:w-full md:flex md:flex-col-reverse" key={e.id}>
                                
                                <div className="">
                                <h2 className=" text-[#B35642]  text-[23px] pb-3 md:order-last">{e.name}</h2>
                                <p className="text-black md:order-3">{e.description}</p>
                                </div>

                                <div>
                                 <img className="rounded-lg border border-[#B35642] md:order-1" src={e.image} alt={e.image}/>
                                </div>

                            </div>
                        )
                    })
                    
                    :
                    <div className=" text-[20px]  pt-14">
                    <p>No se encontraron instalaciones</p>
                    </div> : <></> : facilitiesDiv ? facilities.length ? facilities.map((e, index) => {
                        return (
                            <div className="border p-5   items-center justify-center space-x-5 w-full  text-white" key={e.id}>
                                
                                <div className="">
                                <h2 className="   text-[23px] pb-5 ">{e.name}</h2>
                                <img className="rounded-lg border border-white " src={e.image} alt={e.image}/>
                                <p className="  pt-5">{e.description}</p>
                                </div>

                                <div>
                                 
                                </div>

                            </div>
                        )
                    })
                    
                    :
                    <div className=" text-[20px]  pt-14">
                    <p>No se encontraron instalaciones</p>
                    </div> : <></>
                }
                {
                    facilitiesDiv ? <div className="border w-full h-full p-6 justify-center  text-center items-center "><div className="text-[#E2725B] bg-white border border-[#E2725B]"><h3>Más actualizaciones proximamente!</h3></div></div> : <></>
                }
                
        </div>
        <section id="proyChange">
        </section>
        <div className="mb-10 mt-14 p-5  md:p-8 h-full w-full  border-t-4 pt-14 border-black bg-zinc-800 shadow-md  shadow-black text-white pb-14">
        
                 <h2 className="text-[30px] text-[#B35642] md:text-[26px] aser:text-[35px] lg:text-[40px]  ggg:text-[48px] ">Proyecto intercambio</h2>
                 <div className="md:grid md:grid-cols-2 md:p-5 md:space-x-5 ">
                <p className="text-center pt-8 md:pt-[15%] text-[18px] md:text-[24px] aser:text-[28px] lg:text-[34px] lg:pt-[20%] ggg:text-[38px] ggg:leading-[40px]">Mediante el proyecto de intercambio te damos la oportunidad de vivir la experiencia del campo, te dejamos unirte a nosotros como trabajadores para hacer los diferentes quehaceres rurales, a cambio de tu trabajo te ofrecemos la estadia gratis más las 3 comidas diaras.</p>
                <img className="border border-[#B35642] rounded-lg mt-8" src={fachada} alt={fachada}/>
                </div>
                <section id="proyRural">
        </section>
            </div>
            
        <div className=" p-5 md:p-8 h-full w-full  pt-14 border-t-4 border-black bg-zinc-800 shadow-md  shadow-black text-white pb-14">


                 <h2 className="text-[30px] text-[#B35642] md:text-[26px] aser:text-[35px] lg:text-[40px]  ggg:text-[48px] ">Proyecto rural</h2>
                 <div className="md:grid md:grid-cols-2 md:p-5 md:space-x-5 ">
                <p className="text-center pt-8 md:pt-[15%] text-[18px] md:text-[24px] aser:text-[28px] lg:text-[34px] lg:pt-[20%] ggg:text-[38px] ggg:leading-[40px]">El proyecto rural consiste en aprovechar el espacio del campo para convertirlo en una zona verde, podes contribuir al mismo viniendo a la posada a plantar tu arbol y contribuir con la causa! Si reservas y venis con tu arbolito recibis descuentos!.</p>
                <img className="border border-white rounded-lg mt-8" src={fachada} alt={fachada}/>
                </div>

            </div>
        
            </div>
        </div>
    )
};