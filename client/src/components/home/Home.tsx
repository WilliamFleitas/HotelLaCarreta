import React from "react";
import { Contenido } from "./Contenido";
import { CarrouselFondo } from "./CarrouselFondo";

import "./home.css";
import { Check } from "./Check";
import { Welcome } from "./Welcome";
import { RoomCarrusel } from "./RoomCarrusel";
import { Highlights } from "./Highlights";

const Home = () => {
  return (
    <div className="flex flex-col items-center overflow-hidden	">
      <CarrouselFondo/>

      <Check/>
      <div>
      <Welcome/>
      </div>
      <RoomCarrusel/>
      <Highlights/>
      {/* <div className="border-2">
        <button>Buscar</button>
      </div>
        <Contenido/> */}
    </div>
  );
};

export default Home;
