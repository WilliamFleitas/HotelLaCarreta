import React from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

const RightNav = () => {
  return (
    // md: para los de desktop
    <Menu right width={"85%"}>
      <NavLink to="#" className="pl-2 py-4 bg-[#333333]">
        Idiomas
      </NavLink>
      <NavLink to="#" className="pl-2 py-4">
        Tema Oscuro
      </NavLink>
      <NavLink to="#" className="pl-2 py-4 bg-[#333333]">
        Habitaciones
      </NavLink>
      <NavLink to="#" className="pl-2 py-4">
        Sobre Nosotros
      </NavLink>
      <NavLink to="#" className="pl-2 py-4 bg-[#333333]">
        Condiciones
      </NavLink>
      <NavLink to="#" className="pl-2 py-4">
        Contacto
      </NavLink>
    </Menu>
  );
};

export default RightNav;
