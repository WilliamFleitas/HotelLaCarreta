import React from "react";
import { NavLink } from "react-router-dom";

const linkStyle = 'p-2 hover:bg-[#E2725B] hover:text-white cursor-pointer rounded duration-500';

const HorizontalNav = () => {
  return (
    <ul className="hidden md:flex md:items-center w-9/12 justify-around">
      <li className={linkStyle}>Idioma</li>
      <li>
        <NavLink to="/habitaciones" className={linkStyle}>
          Habitaciones
        </NavLink>
      </li>
      <li>
        <NavLink to="/sobreNosotros" className={linkStyle}>
          Sobre Nosotros
        </NavLink>
      </li>
      <li>
        <NavLink to="/condiciones" className={linkStyle}>
          Condiciones
        </NavLink>
      </li>
      <li>
        <NavLink to="/contacto" className={linkStyle}>
          Contacto
        </NavLink>
      </li>
    </ul>
  );
};

export default HorizontalNav;
