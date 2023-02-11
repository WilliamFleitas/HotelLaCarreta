import React from "react";
import { Contenido } from "./Contenido";
import { CarrouselFondo } from "./CarrouselFondo";

import "./home.css";
import { Welcome } from "./Welcome";
import { RoomCarrusel } from "./RoomCarrusel";
import { Highlights } from "./Highlights";
import useWindowSize from "../customHooks/useWindowSize";
import { Facilities } from "./Facilities";
import { AboutHome } from "./AboutHome";
import { Events } from "./Events";
import { Footer } from "./footer/Footer";
import { CheckFilter } from "./CheckFilter";

const Home = () => {
  const {width} = useWindowSize();
  return (
    <div className="flex flex-col items-center	h-full w-screen overflow-x-hidden" >
      <CarrouselFondo/>

      <CheckFilter/>
      
      {
        width < 768 ? 
        <><Welcome/>
        <RoomCarrusel/>
        <Highlights/>
        </> 
        :
        <>
        <RoomCarrusel/>
      <Welcome/>
      <Facilities/>
      <AboutHome/>
      <Highlights/>
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
