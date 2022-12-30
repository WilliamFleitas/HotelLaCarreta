import React, { useEffect, useState } from "react";
import foto1 from "../../assets/carreta1.jpg"
import foto2 from "../../assets/carreta2.jpg"
import foto3 from "../../assets/carreta3.jpg"
import foto4 from "../../assets/carreta4.jpg"
import foto5 from "../../assets/carreta5.jpg"
import foto6 from "../../assets/carreta6.jpg"
import foto7 from "../../assets/carreta7.jpg"
import foto8 from "../../assets/carreta8.jpg"
import foto9 from "../../assets/carreta9.jpg"

export const CarrouselFondo = ()=>{
    const carroImage = [
        foto1,
        foto2,
        foto3,
        foto4,
        foto5,
        foto6,
        foto7,
        foto8,
        foto9
    ];

    const [actualImage, setActualImage] = useState(0);

    let myInterval: any;
    
    const nextImg = () => {
        clearInterval(myInterval);
        setActualImage(actualImage === carroImage.length - 1 ? 0 : actualImage + 1);
      };

      useEffect(() => {
        myInterval = setInterval(nextImg, 7000);
      }, [actualImage]);

    return (
            <div>
                {
                carroImage?.map((image:string, index:number): any => {
                    return(
                        <div>
                            {actualImage === index && ( 
                                <div>
                                    <h1 className="text-7xl text-center text-white opacity-100">La Carreta Posada Turistica Rural</h1>
                                    <img className="w-screen h-screen p-2 mb-10 opacity-30" src={image} key={index} />
                                </div>
                            )}
                        </div>
                    )
                    })
                }
            </div>
    )
}