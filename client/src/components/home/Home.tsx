import React from "react";
import { Contenido } from "./Contenido";
import { CarrouselFondo } from "./CarrouselFondo";

const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <CarrouselFondo/>
      <div className="border-2">
        <button>Buscar</button>
      </div>
        <Contenido/>
    </div>
  );
};

export default Home;
