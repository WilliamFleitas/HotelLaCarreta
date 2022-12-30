import React from "react";
import { NavLink } from "react-router-dom";
import Burger from "./Burger";
import RightNav from "./RightNav";

const NavBar = () => {
  return (
    <div className='bg-black/80 fixed top-0 w-full flex justify-around h-[10vh] z-10'>
      <div className='self-center'>Logo La Carreta</div>
      <RightNav />
      {/* <Burger /> */}
    </div>
  );
};

export default NavBar;
