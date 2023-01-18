import React from "react";
import { Contenido } from "./Contenido";
import { CarrouselFondo } from "./CarrouselFondo";

import "./home.css";
import { Check } from "./Check";
import { Welcome } from "./Welcome";
import { RoomCarrusel } from "./RoomCarrusel";
import { Highlights } from "./Highlights";
import useWindowSize from "../customHooks/useWindowSize";
import { Facilities } from "./Facilities";
import { AboutHome } from "./AboutHome";
import { Events } from "./Events";

const Home = () => {
  const {width} = useWindowSize();
  return (
    <div className="flex flex-col items-center overflow-hidden	">
      <CarrouselFondo/>

      <Check/>
      
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
