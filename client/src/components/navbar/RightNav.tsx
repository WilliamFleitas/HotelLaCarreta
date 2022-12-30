import React from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";

const RightNav = () => {
  return (
    // md: para los de desktop
    <Menu right width={"80%"}>
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
    </Menu>
  );
};

export default RightNav;
