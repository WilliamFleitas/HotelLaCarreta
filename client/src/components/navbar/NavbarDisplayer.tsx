import React from "react";
import Navbar from "./Navbar";
import NavbarAdmin from "./NavbarAdmin";

const NavbarDisplayer = () => {
  const admin = true;
  return admin ? <NavbarAdmin /> : <Navbar />;
};

export default NavbarDisplayer;
