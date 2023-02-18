import React from "react";
import { Contact } from "./Contact";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineMail} from 'react-icons/ai';
import useWindowSize from "../../customHooks/useWindowSize";
import { Link } from "react-router-dom";


export const Footer = () => {

  const {width} = useWindowSize();

    return (
        <div className="text-center items-center justify-center   bg-[#B35642] mt-24 border-t-2 border-black h-full w-screen p-5 " > 
        <section id="footer">
          {
            width >=768 ? 
            <div>
              <h2 className="text-white text-[30px] pt-5 pb-5">Contacto</h2>
            </div> : <></>
          }
      <div className="md:grid md:grid-cols-2">

      <div>
           { 
        width >= 768 ?
            <div>
              <h2 className="text-white text-[25px] pt-5 ">Sientase libre de escribir cuando quiera!</h2>
          <Contact/>
            </div>
        :
        <></>
      } 
      </div>

      <div className="">
    <div className="">
    <section id="footer"></section>
    <h2 className="text-white text-[25px] pt-5 md:pb-14">Nuestras redes!</h2>
    </div>

      
      <div className="md:p-5 ">
      <div className="text-black text-[50px] text-center items-center h-full w-full justify-center align-center flex flex-row py-5 space-x-8  md:h-fit ">
        <div className="md:bg-white rounded-lg">
          <a draggable="false" href="https://es-la.facebook.com/lacarretaposadarural/"  rel="noopener noreferrer" target="_blank">
            <button className="hover:bg-white hover:rounded-md hover:bg-opacity-[70%]">
            <AiOutlineFacebook/>
            </button>
          </a>
        </div>
        <div className="md:bg-white rounded-lg">
            <a draggable="false" href="https://www.instagram.com/la_carreta_posada/"  rel="noopener noreferrer" target="_blank" >
            <button className="hover:bg-white hover:rounded-md hover:bg-opacity-[70%]">
          <AiOutlineInstagram/>
          </button>
          </a>
          </div>
        <div className="md:bg-white rounded-lg">
            <button onClick={() => {
              window.location.href = 'mailto:posadalacarretasp@gmail.com'}} className="hover:bg-white hover:rounded-md hover:bg-opacity-[70%]">
          <AiOutlineMail/>
          </button>
        </div>
      </div>

      <div className="pt-1 p-1 text-[18px] border-b-4 border-black md:border-none">
        <h4 className="py-1">Celular: 0975666777</h4>
        <h4 className="py-1">Email: frijolito@hotmail.com</h4>
        <p className="py-1">Atendemos de lunes a domingo las 24hs!</p>
      </div>
      </div>
      </div>

      </div>

      <div className="md:p-5 ">
      <div className="text-[#E2725B] text-[15px] text-center items-center  justify-center align-center flex flex-row py-8 mt-8 space-x-3 px-5 md:border-t-2   md:bg-white md:rounded-2xl md:text-[3vh]">
      
        <a className="border border-white shadow-md shadow-black p-2 bg-white md:w-screen md:h-full md:border-none md:shadow-none hover:opacity-[60%]" href={"/aboutus"  }>Detalles del hotel</a>
      

        <a className="border border-white p-2 bg-white shadow-md shadow-black md:w-screen md:h-full md:border-none md:shadow-none hover:opacity-[60%]" href={"/aboutus"  }>Proyecto de intercambio</a>

        <a className="border border-white p-2 bg-white shadow-md shadow-black md:w-screen md:h-full md:border-none md:shadow-none hover:opacity-[60%]" href={"/aboutus"}>Proyecto rural
        </a>
      </div>
      </div>
      <h2 className="pb-5">© 2023 Oni™. All Rights Reserved.</h2>
      </section>
        </div>
    )
};