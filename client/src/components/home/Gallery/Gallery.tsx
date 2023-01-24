import { current } from "@reduxjs/toolkit";
import e from "express";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllPost } from "../../../redux/slices/GallerySlice/Galleryaction";
import { ModalGallery } from "../../customHooks/ModalGallery";
import useWindowSize from "../../customHooks/useWindowSize";
import { GalleryPhotos } from "./GalleryPhotos";

export const Gallery = () => {
  const posts = useAppSelector((state) => state.gallery.postList);
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const {width } = useWindowSize();
 
  const handleModal = (bool: boolean, index: number) => {
    setShowModal(bool);
    setCurrentImg(index);
  };

  return (<div>
    {width < 768 ? <div className="text-black pt-5 p-5 text-center justify-center items-center">
      <h2 className="text-[#B35642] text-[30px] pb-5 tcw:pt-8 tcw:text-[34px] tcw:pb-8">Gallería</h2>
      <div className="bg-[#B35642] h-full w-screen p-5 pb-24  border-2 border-[#D3B616]">
      <h2 className="text-white text-[20px] tcw:text-[24px] tcw:py-2">Publicaciones de La Carreta</h2>
        {typeof posts === "object" && posts.length > 0 ? (
          posts.slice(0, 4).map((e, index) => {
            return (
              <div className="py-5" key={e.id}>
                <div className="leading-[0px]">
                <button type="button" onClick={() => handleModal(true, index)}>
                  <img
                    className="rounded-t-lg"
                    src={e.image}
                    alt={`${e.image}+${index}`}
                  />
                </button>
                <div className=" bg-white border border-[#D3B616] rounded-b-lg p-3 leading-[20px] w-full h-full text-start">
                  <p className="tcw:text-[18px]">{e.description}</p>
                </div>
                </div>
                <div>
                  {showModal && currentImg === index ?  <div onClick={() => handleModal(false, index)}>
                    <ModalGallery image={`${e.image}`} /> 
                    </div>
                   : <></>}
                </div>
              </div>
            );
          })
        ) : (
          <div>No se encontraron productos</div>
        )}
      </div>
      
    </div> 
    :
    <div className="pt-[70px] xl:pt-[60px] 1xl:pt-[40px]  text-black p-5 text-center items-center justify-center">
      <h2 className="text-[35px] text-[#B35642] pt-3 pb-10">Publicaciones de La Carreta</h2>
      <div className={typeof posts === "object" && posts.length > 0 ? "grid grid-cols-5 "  : "pt-8"}>
        {
          typeof posts === "object" && posts.length > 0 ? posts.slice(0, 5).map((e, index) => {
            return (
              <div className="p-1 " key={e.id}>
                <div>
                <button type="button" onClick={() => handleModal(true, index)}>
                  <img className="h-[330px] w-screen object-cover border-2 border-[#B35642] rounded-t-lg 1xl:h-[450px]" src={e.image}/>
                  </button>
                </div>

                <div className="bg-white bg-opacity-[90%] border-2 border-[#B35642]  w-full text-[18px] text-start  pb-4 pt-4 p-2 rounded-b-md  overflow-auto h-[150px]">
                  <p>{e.description}</p>
                </div>
                <div>
                  {showModal && currentImg === index ?  <div onClick={() => handleModal(false, index)}>
                    <ModalGallery image={`${e.image}`} /> 
                    </div>
                   : <></>}
                </div>
              </div>
            )
          }) : <div className="text-center items-center"><h2>No se encontraron productos...</h2></div>
        }
      </div>
    </div> 
    }
    <div className="pb-2">
      <GalleryPhotos/>
      </div>
  </div>
    
  );
};