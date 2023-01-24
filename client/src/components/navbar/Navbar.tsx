import React from "react";
import { Link} from "react-router-dom";
import HorizontalNav from "./HorizontalNav";
import RightNav from "./RightNav";

const NavBar = () => {
  return (
    <div className="bg-[#B35642] md:bg-white md:text-[#E2725B] fixed top-[-1px] w-full flex justify-around h-[10vh]  z-10 md:drop-shadow-lg shadow-md shadow-white"> 
      
      <div className="self-center hover:opacity-[70%]"><Link to="/home">Logo La Carreta</Link></div>
      
      <div className="md:hidden">
        <RightNav />
      </div>
      <HorizontalNav />
    </div>
  );
};

export default NavBar;