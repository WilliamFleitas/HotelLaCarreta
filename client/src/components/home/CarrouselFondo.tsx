import React, { useEffect, useState } from "react";
import foto1 from "../../assets/carreta1.jpg";
import foto2 from "../../assets/carreta2.jpg";
import foto3 from "../../assets/carreta3.jpg";

export const CarrouselFondo = () => {
  const carroImage = [foto1, foto2, foto3];

  const [actualImage, setActualImage] = useState(0);

  let myInterval: any;

  const nextImg = () => {
    clearInterval(myInterval);
    setActualImage(actualImage === carroImage.length - 1 ? 0 : actualImage + 1);
  };

  // useEffect(() => {
  //   myInterval = setInterval(nextImg, 9000);
  // }, [actualImage]);

  return (
    <div className="h-[100vh] w-screen text-center">
      {carroImage?.map((image: string, index: number): any => {
        return (
          <div>
            {actualImage === index && (
              <div>
                <img
                  className="object-cover h-[100vh] w-[500px] brightness-50"
                  src={image}
                  key={index}
                />

                <div className="borderText absolute bottom-[2em] items-center w-full text-center text-white">
                  <h1 className="text-5xl pl-2 pb-2">La Carreta </h1>
                  <h2 className=" text-xl pl-2 pb-6">Posada Rural</h2>
                  <button className="borderText pl-2 font-sans font-bold text-center text-[20px] items-center border-[1px] border-[#c9b505] p-2 rounded-md bg-[#B35642]">
                    Descubrir más
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
