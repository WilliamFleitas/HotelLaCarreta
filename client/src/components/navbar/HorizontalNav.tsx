import React from "react";
import { NavLink } from "react-router-dom";
import Dropdown from 'react-dropdown';

const linkStyle = 'p-2 hover:bg-[#E2725B] hover:text-white cursor-pointer rounded duration-300';

const HorizontalNav = () => {
  return (
    <ul className="hidden md:flex md:items-center w-9/12 justify-around max-w-[600px]">
      {/* <li className={linkStyle}>Idioma
        <ul className="absolute bg-blue-400 top-16 h-40 w-20">
          <li>Español</li>
          <li>English</li>
        </ul>
      </li> */}
      <li>
        <NavLink to="/rooms" className={linkStyle}>
          Habitaciones
        </NavLink>
      </li>
      <li>
        <NavLink to="/gallery" className={linkStyle}>
          Galeria
        </NavLink>
      </li>
      <li>
       <a draggable="false" className={linkStyle}href="#footer">Contacto</a>
      </li>
      <li>
        <NavLink to="/aboutus" className={linkStyle}>
          Sobre Nosotros
        </NavLink>
      </li>
    </ul>
  );
};

export default HorizontalNav;
