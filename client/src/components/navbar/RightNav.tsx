import React from "react";
import { NavLink } from "react-router-dom";

const RightNav = () => {
  return (
    // md: para los de desktop
    <ul className="flex flex-col flex-nowrap bg-black/80 fixed top-0 right-0 pt-[10vh] h-screen w-10/12 hidden  md:flex-row">
      <NavLink to="#" className="p-2">
        Idiomas
      </NavLink>
      <NavLink to="#" className="p-2">
        Tema Oscuro
      </NavLink>
      <NavLink to="#" className="p-2">
        Habitaciones
      </NavLink>
      <NavLink to="#" className="p-2">
        Sobre Nosotros
      </NavLink>
      <NavLink to="#" className="p-2">
        Condiciones
      </NavLink>
      <NavLink to="#" className="p-2">
        Contacto
      </NavLink>
    </ul>
  );
};

export default RightNav;
