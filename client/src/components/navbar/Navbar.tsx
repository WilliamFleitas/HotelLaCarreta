import React from "react";
import { NavLink } from "react-router-dom";
import HorizontalNav from "./HorizontalNav";
import RightNav from "./RightNav";

const NavBar = () => {
  return (
    <div className="bg-[#B35642] md:bg-white md:text-[#E2725B] fixed top-0 w-full flex justify-around h-[10vh] z-10 md:drop-shadow-lg">
      <div className="self-center">Logo La Carreta</div>
      <div className="md:hidden">
        <RightNav />
      </div>
      <HorizontalNav />
    </div>
  );
};

export default NavBar;