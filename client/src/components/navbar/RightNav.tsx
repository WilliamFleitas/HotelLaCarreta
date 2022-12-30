import React from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Flag from "react-world-flags";

const RightNav = () => {

  const changeLanguage = (lan: string) =>{
    console.log(lan);
  }

  return (
    // md: para los de desktop
    <Menu right width={"85%"}>
      <div className="pl-2 py-4 bg-[#333333] w-full">
        <p>Idiomas</p>
        <div className="flex w-10/12 items-center justify-center max-w-[202px]">
          <Flag code={"826"} onClick={() => changeLanguage('english')} className="w-12 mr-8" />
          <Flag code={"724"} onClick={() => changeLanguage('español')} className="w-12 " />
        </div>
      </div>
      <div className="pl-2 py-4">
        <p>Tema Oscuro</p>
      </div>
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
