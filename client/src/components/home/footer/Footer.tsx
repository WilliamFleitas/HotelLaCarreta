import React from "react";
import { Contact } from "./Contact";
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineMail} from 'react-icons/ai';


export const Footer = () => {

    return (
        <div className="text-center items-center justify-center   bg-[#B35642] mt-24 border-t-2 border-black ">
           

    <div className="">
    <h2 className="text-white text-[25px] pt-5 ">Nuestras redes!</h2>
    </div>
       
      
      <div className="text-black text-[50px] text-center items-center h-full w-full justify-center align-center flex flex-row py-5 space-x-8">
        <div className=""><AiOutlineFacebook/></div>
        <div><AiOutlineInstagram/></div>
        <div><AiOutlineMail/></div>
      </div>
      <div className="pt-1 p-1 text-[18px] border-b-4 border-black">
        <h4 className="py-1">Celular: 0975666777</h4>
        <h4 className="py-1">Email: frijolito@hotmail.com</h4>
        <p className="py-1">Atendemos de lunes a domingo las 24hs!</p>
      </div>
      <div>
      </div>
      <div className="text-[#B35642] text-[15px] text-center items-center   justify-center align-center flex flex-row py-8 mt-8 space-x-3 px-5">
        <h3 className="border border-white p-2 bg-white">Detalles del hotel</h3>
        <h3 className="border border-white p-2 bg-white">Proyecto Zona Verde</h3>
        <h3 className="border border-white p-2 bg-white">Proyecto intercambio</h3>
      </div>
      <h2 className="pb-5">© 2023 Oni™. All Rights Reserved.</h2>
        </div>
    )
};