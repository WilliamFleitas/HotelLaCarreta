import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import HorizontalNav from "./HorizontalNav";
import RightNav from "./RightNav";


const NavBar = () => {
 
  
  return (
    <div className=" bg-[#B35642] md:bg-white md:border-b  border-[#E2725B] md:text-[#E2725B] fixed top-[-2px] w-full flex justify-around h-[10vh] z-10  md:shadow-lg md:shadow-[#B35642]" >
      
      <div className="animation self-center" ><NavLink to="/" >Logo La Carreta</NavLink></div>
      
      <div className="md:hidden">
        <RightNav />
      </div>
      <HorizontalNav />
    </div>
  );
};

export default NavBar;
