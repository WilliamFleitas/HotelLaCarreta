import React, { useEffect } from "react";
import { CarrouselFondo } from "./CarrouselFondo";
import "./home.css";
import { Welcome } from "./Welcome";
import { RoomCarrusel } from "./RoomCarrusel";
import { Highlights } from "./Highlights";
import useWindowSize from "../customHooks/useWindowSize";
import { Facilities } from "./Facilities";
import { AboutHome } from "./AboutHome";
import { Events } from "./Events";
import { CheckFilter } from "./CheckFilter";
import { ReviewsCompo } from "./ReviewsCompo";
import { Ubication } from "./Ubication";


const Home = () => {
  const {width} = useWindowSize();

  
  
  return (
    <div className="top flex flex-col items-center	h-full w-screen overflow-x-hidden" >
      <div className="z-8">
      <CarrouselFondo />
      </div>
      <div className="animation delay-150 duration-300" data-aos-duration="500" data-aos-easing="ease-in-out" data-aos='fade-up'>
      <CheckFilter/>
      </div>
      {
        width < 768 ? 
        <><Welcome/>
        <RoomCarrusel/>
        <Highlights/>
        </> 
        :
        <>
        <div className="animation" data-aos-duration="2000" data-aos-easing="ease-in-out" data-aos='fade-up'>
        <RoomCarrusel/>
        </div>
      <Welcome/>
      <Facilities/>
      <AboutHome/>
      <Highlights/>
      <div ><ReviewsCompo/></div>
      <div><Ubication/></div>
      
       
      <Events/>
        </>
      }
      

      
      {/* <div className="border-2">
        <button>Buscar</button>
      </div>
        <Contenido/> */}

      
    </div>
  );
};

export default Home;
