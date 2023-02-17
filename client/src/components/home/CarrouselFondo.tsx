import React, { useEffect, useState } from "react";
import foto1 from "../../assets/carreta1.jpg";
import foto2 from "../../assets/carreta2.jpg";
import foto3 from "../../assets/carreta3.jpg";
import useWindowSize from "../customHooks/useWindowSize";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-router-dom";


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
    <div className="overflow-x-hidden " >
    { width < 768 ? <div className="h-[500px] w-screen tcw:h-full tcw:w-full text-center cvo:h-[710px] " >
        
    {carroImage?.map((image: string, index: number): any => {
      return (
        <div key={image} >
          {actualImage === index && (
            <div>
              <img draggable="false"
                className="object-cover h-[500px] w-screen tcw:h-[500px] tcw:w-screen tsw:h-[650px] cvo:h-[710px] "
                src={image}
                key={index}
                loading="lazy"
              />

              <div className="borderText absolute top-[250px] items-center w-[310px] tcw:justify-center text-center  text-white tcw:w-screen tsw:pt-20" draggable="false">
                <h1 className="text-[70px] pl-2 pb-6 ">La Carreta </h1>
                <h2 className=" text-[20px] tsw:text-[25px] pb-14 pl-2  ">Posada Rural</h2>
                <Link to="/gallery">
                <button className="borderText pl-2  font-sans font-bold text-center text-[15px] items-center border-[1px] border-[#c9b505] p-2 rounded-md bg-[#B35642] hover:bg-[#c25f48] hover:border-white">
                  Descubrir más
                </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div> 
  : 
  <div className="grid grid-cols-2 text-[#696969] pt-28 pb-20 px-8 lg:pb-24 lg:p-14 lg:pt-24 aser:pt-36 xl:p-[60px] xl:pb-8 xl:pt-28 lgg:p-[50px] lgg:pb-[75px] ggg:pb-[150px]  lgg:pt-24 3x1:pt-30 3x1:pb-36 ">
    
     <div id="slide2" className="p-5 space-y-3 text-[20px] aser:leading-[23px] lg:space-y-8 lg:p-0 lg:pt-5 lgg:space-y-5 xl:space-y-10   xl:leading-[36px] xl:p-4 ggg:leading-[28px] gxl:leading-[34px]  1xl:leading-[42px]">
        <h2 className="text-[#E2725B] text-[45px] leading-10 lg:text-[60px] lg:leading-[60px] aser:text-[50px] xl:pt-[0px] aser:leading-[45px] lgg:leading-[75px] ggg:pt-10 xl:leading-[60px] gxl:text-[55px] 3x1:text-[70px] 3x1:leading-[64px] 3x1:p-5">Imagine a place where you can be yourself</h2>
        <p className="pt-2 text-[23px] lg:text-[25px] aser:text-[23px] lg:p-3 lgg:p-0 gxl:text-[30px] 3x1:text-[35px]  3x1:p-5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit delectus rem veniam ratione, voluptatibus debitis eveniet esse dicta odio cum, aspernatur quas repellat, voluptate corrupti numquam. Commodi facilis voluptates illo.</p>

            <div className="">
              <Link to="/gallery">
             <button className="text-[#E2725B] text-[20px]  border  rounded-lg border-[#E2725B] p-3 3x1:ml-5 hover:border-[#E2725B] hover:bg-zinc-100 shadow-md shadow-[#B35642]"> DESCUBRIR MÁS ➜</button>
             </Link>
            </div>

     </div>

     <div className="wrapper  lgg:pl-14 3x1:pl-34 ">
     {carroImage?.map((image: string, index: number): any => {
      return (
        <div key={image} className="">
          {actualImage === index && (
            <div className=" lg:pt-6 xl:pt-0  ">
              <img id="slide"
                className="slide h-[400px] object-cover  w-[400px] rounded-tl-[180px] rounded-br-[180px] rounded-[20px] border-y-2 border-[#B35642] lg:h-[460px] lg:w-[480px] xl:h-[500px] xl:w-[650px] 3x1:h-[600px] 3x1:w-[800px] shadow-lg shadow-[#B35642] "
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
