import React from "react";
import NavBar from "./NavBar";
import NavbarAdmin from "./NavbarAdmin";

const NavbarDisplayer = () => {
  const admin = true;
  return admin ? <NavbarAdmin /> : <NavBar />;
};

export default NavbarDisplayer;
