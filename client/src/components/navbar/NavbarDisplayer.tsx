import React from "react";
import NavBar from "../navbar/Navbar";
import NavbarAdmin from "./NavbarAdmin";

const NavbarDisplayer = () => {
  const admin = true;
  return admin ? <NavbarAdmin /> : <NavBar />;
};

export default NavbarDisplayer;
