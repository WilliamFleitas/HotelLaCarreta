import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllPost } from "../../../redux/slices/GallerySlice/Galleryaction";
import { ModalGallery } from "../../customHooks/ModalGallery";
import useWindowSize from "../../customHooks/useWindowSize";

export const GalleryPhotos = () => {
  const {postList, postsLength} = useAppSelector((state) => state.gallery);
  
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const { width } = useWindowSize();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImg, setCurrentImg] = useState(0);
  useEffect(() => {
    if (width < 768) {
      dispatch(getAllPost());
    } else {
      dispatch(getAllPost(currentPage));
    }
  }, [dispatch, currentPage]);
  
  const handleModal = (bool: boolean, index: number) => {
    setShowModal(bool);
    setCurrentImg(index);
  };

  return (
    <div>
      {width < 768 ? (
        <div className="text-white pt-6 bg-[#B35642] m-9  border-2 border-[#D3B616] relative top-[-90px] overflow-scroll h-[80rem] p-2 text-center">
          <h2 className="ccw:text-[25px] cvo:text-[28px]">
            Galleria de imagenes
          </h2>
          <div className=" pt-3">
            {typeof postList === "object" && postList.length > 0 ? (
              postList.map((e, index) => {
                return (
                  <div className="p-5" key={e.id}>
                    <button onClick={() => handleModal(true, index)}>
                    <img
                      
                      className="w-screen h-full border-2 border-[#D3B616] rounded-lg"
                      src={e.image} alt={`${e.image}+${index}`}
                    />
                    </button>
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
              <>No se encontraron publicaciones</>
            )}
            
          </div>
        </div>
      ) : (
        <div className="text-black p-5 pt-14 text-center items-center justify-center flex flex-col">
          <h2 className="text-[40px] text-[#B35642] pt-3 pb-10">Galeria</h2>

          <div className={typeof postList === "object" && postList.length > 0 ? "p-5 bg-[#B35642] rounded-lg  h-[1200px] overflow-scroll  align-start justify-center text-center items-center " : "p-5 bg-[#B35642] rounded-lg  h-full w-screen overflow-hidden  align-start justify-center text-center items-center "}>
            <div className={typeof postList === "object" && postList.length > 0 ? "gap-2 columns-3" : ""}>
              {typeof postList === "object" && postList.length > 0 ? (
                postList.map((e, index) => {
                  return (
                    <div className="p-3 " key={e.id}>
                      <button type="button" onClick={() => handleModal(true, index)}>
                      <img
                        className="rounded-lg h-full  w-screen object-cover border border-white"
                        src={e.image}
                        alt={`${e.image}+${index}`}
                      />
                      </button>
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
                <div>
                  <h2>No se encontraron imagenes</h2>
                </div>
              )}
            </div>
            {
              postsLength === postList.length ?  <></> 
              : 
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              className="text-center text-[#B35642] items-center justify-center bg-white p-2 rounded-lg"
            >
              VER MÁS
            </button>
            }
            
          </div>
        </div>
      )}
    </div>
  );
};
