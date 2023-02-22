import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import HorizontalNav from "./HorizontalNav";
import RightNav from "./RightNav";
import logoCarreta from "../../assets/logolacarreta.png"
import logoMobile from "../../assets/logolacarretaMobile.png";


const NavBar = () => {
 
  
  return (
    <div className=" bg-[#B35642] md:bg-white md:border-b  border-[#E2725B] md:text-[#E2725B] fixed top-[-2px] w-full flex justify-around h-[10vh] z-10  md:shadow-lg md:shadow-[#B35642]" >
      
      <div className="animation self-center hidden md:block" ><NavLink to="/" ><img className="h-[50px]" src={logoCarreta}/></NavLink></div>
      <div className="animation self-center md:hidden" ><NavLink to="/" ><img className="h-[50px]" src={logoMobile}/></NavLink></div>
      
      <div className="md:hidden">
        <RightNav />
      </div>
      <HorizontalNav />
    </div>
  );
};

export default NavBar;
