import React from "react";
import { NavLink } from "react-router-dom";
import { slide as Menu } from "react-burger-menu";
import Flag from "react-world-flags";

const itemStyle = "pl-4 py-4 hover:opacity-[70%]";

const RightNav = () => {
  const changeLanguage = (lan: string) => {
    console.log(lan);
  };

  return (
    // md: para los de desktop
    <Menu right width={"85%"}>
      {/* TODO implementar traducciones */}
      {/* <div className={itemStyle}>
        <p className="self-center">Idiomas</p>
        <div className="flex w-10/12 items-center justify-center max-w-[202px]">
          <Flag
            code={"826"}
            onClick={() => changeLanguage("en")}
            className="w-12 mr-8"
          />
          <Flag
            code={"724"}
            onClick={() => changeLanguage("es")}
            className="w-12 "
          />
        </div>
      </div> */}
      {/* <div className={itemStyle}>
        <p>Tema Oscuro</p>
      </div> */}
      <NavLink to="/home" className={itemStyle}>
        Home
      </NavLink>
      <NavLink to="/gallery" className={itemStyle}>
        Galleria
      </NavLink>
      
        <a draggable="false" className={itemStyle} href="#footer">Contacto</a>
        
      
      
      <NavLink to="/rooms" className={itemStyle}>
        Habitaciones
      </NavLink>
      
      <NavLink to="/aboutus" className={itemStyle}>
        Sobre Nosotros
      </NavLink>
    </Menu>
  );
};

export default RightNav;
