import React, { useEffect, useState } from "react";
import foto1 from "../../assets/carreta1.jpg";
import foto2 from "../../assets/carreta2.jpg";
import foto3 from "../../assets/carreta3.jpg";
import useWindowSize from "../customHooks/useWindowSize";
import { BsArrowRight } from "react-icons/bs";


export const CarrouselFondo = () => {
  const carroImage = [foto1, foto2, foto3];
  const { width} = useWindowSize();
  const [actualImage, setActualImage] = useState(0);

  let myInterval: ReturnType<typeof setInterval> | undefined;
  const quantity = carroImage.length -1;
  const nextImg = () => {
    clearInterval(myInterval);
    clearInterval(myInterval);
    setActualImage(actualImage === quantity ? 0 : actualImage + 1);
  };

  useEffect(() => {
    clearInterval(myInterval);
    myInterval = setInterval(nextImg, 9000);
  }, [actualImage]);

  return (
    <div>
    { width < 768 ? <div className="h-[500px] w-screen tcw:h-full tcw:w-full text-center cvo:h-[710px]">
        
    {carroImage?.map((image: string, index: number): any => {
      return (
        <div key={image}>
          {actualImage === index && (
            <div>
              <img
                className="object-cover h-[500px]   w-[500px] tcw:h-[500px] tcw:w-full tsw:h-[650px] cvo:h-[710px] "
                src={image}
                key={index}
                loading="lazy"
              />

              <div className="borderText absolute top-[250px] items-center w-[310px] tcw:justify-center text-center  text-white tcw:w-screen tsw:pt-20">
                <h1 className="text-[70px] pl-2 pb-6 ">La Carreta </h1>
                <h2 className=" text-[20px] tsw:text-[25px] pb-14 pl-2  ">Posada Rural</h2>
                <button className="borderText pl-2  font-sans font-bold text-center text-[15px] items-center border-[1px] border-[#c9b505] p-2 rounded-md bg-[#B35642]">
                  Descubrir más
                </button>
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div> 
  : 
  <div className="grid grid-cols-2 text-[#696969] pt-28 pb-20 px-8">
    
     <div className="p-5 space-y-3 text-[20px]">
        <h2 className="text-[#E2725B] text-[40px] leading-10">Imagine a place where you can be yourself</h2>
        <p className="pt-2 text-[20px]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit delectus rem veniam ratione, voluptatibus debitis eveniet esse dicta odio cum, aspernatur quas repellat, voluptate corrupti numquam. Commodi facilis voluptates illo.</p>

            <div className="">
             <button className="text-[#E2725B] text-[20px]  border  rounded-lg border-[#E2725B] p-3 "> Descubrir más➜</button>
             
            </div>

     </div>

     <div>
     {carroImage?.map((image: string, index: number): any => {
      return (
        <div key={image}>
          {actualImage === index && (
            <div className="">
              <img
                className=" h-[400px] object-cover  w-[400px] rounded-tl-[180px] rounded-br-[180px] rounded-[20px] border-2 border-[#B35642]"
                src={image}
                key={index}
                loading="lazy"
              />
              
            </div>
          )}
        </div>
      );
    })}      
     </div>
  
  </div> 
  }

  </div>
  );
};
