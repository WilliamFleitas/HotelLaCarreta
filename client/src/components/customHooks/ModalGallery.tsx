import React from "react";


export const ModalGallery = (prop: { image: string}) => {
  return (
    <>
      {
        <div>
        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-full w-full bg-white">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            {/*body*/}
            <div className="relative  p-5  flex-auto">
              <img
                className="h-screen w-full object-contain pt-5 md:w-full md:h-full"
                src={prop.image}
                alt={`${prop.image}+`}
              />
            </div>
            
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
      }
    </>
  );
};
