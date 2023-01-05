import React from "react";
import { Contenido } from "./Contenido";
import { CarrouselFondo } from "./CarrouselFondo";

import "./home.css";
import { Check } from "./Check";
import { Welcome } from "./Welcome";
const Home = () => {
  return (
    <div className="flex flex-col items-center">
      <CarrouselFondo />

      <Check />
      <Welcome />

      <div className="border-2">
        <button>Buscar</button>
      </div>
      <Contenido />
    </div>
  );
};

export default Home;
