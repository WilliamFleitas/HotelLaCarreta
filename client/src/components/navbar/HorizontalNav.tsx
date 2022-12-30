import React from "react";
import { NavLink } from "react-router-dom";

const HorizontalNav = () => {
  return (
    <ul className="hidden md:flex md:items-center w-9/12">
      <li>Idioma</li>
      <li>Tema Oscuro</li>
      <li>
        <NavLink to="/habitaciones" className=" ">
          Habitaciones
        </NavLink>
      </li>
      <li>
        <NavLink to="/sobreNosotros" className="">
          Sobre Nosotros
        </NavLink>
      </li>
      <li>
        <NavLink to="/condiciones" className=" ">
          Condiciones
        </NavLink>
      </li>
      <li>
        <NavLink to="/contacto" className="">
          Contacto
        </NavLink>
      </li>
    </ul>
  );
};

export default HorizontalNav;
