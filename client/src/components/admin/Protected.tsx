import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { getUserCall } from "./functions/getUsersCall";

interface IProtectedProps {
  children: JSX.Element;
}

const Protected = ({ children }: IProtectedProps) => {
  const [display, setDisplay] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const session = window.localStorage.getItem("userSession");
    setDisplay(false)
    if (session) {
        getUserCall()
        .then(({data}) => {
                setDisplay(true);
        })
        .catch(() => {
          localStorage.removeItem("userSession");
          navigate("/");
        });
    }else{
      navigate('/')
    }
  }, [setDisplay, navigate]);

  return <>{display ? children : <h1>Cargando..</h1> }</>;
};

export default Protected;