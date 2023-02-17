import React from "react";

export const Ubication = () => {
  return (
    <div className="text-center justify-center items-center pt-20">
      <h2 className="text-[#E2725B] text-[35px] ">Ubicación</h2>
      <div className="shadow-md my-14 shadow-black p-5 bg-[#B35642] rounded-lg  text-[20px]">
        <h2 className="pb-4">¿Como llegar a la posada?</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d113914.36866256602!2d-57.086308!3d-26.845549!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xfbef7214f9e04c2f!2sLa%20Carreta%20Posada%20Tur%C3%ADstica%20Rural!5e0!3m2!1ses-419!2spy!4v1676613052614!5m2!1ses-419!2spy"
          className=" w-[600px] h-[300px] rounded-lg"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};
