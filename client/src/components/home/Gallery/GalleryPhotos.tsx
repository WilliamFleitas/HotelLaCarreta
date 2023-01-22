import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { getAllPost } from "../../../redux/slices/GallerySlice/Galleryaction";
import useWindowSize from "../../customHooks/useWindowSize";

export const GalleryPhotos = () => {
  const {postList, postsLength} = useAppSelector((state) => state.gallery);
  
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const { width } = useWindowSize();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (width < 768) {
      dispatch(getAllPost());
    } else {
      dispatch(getAllPost(currentPage));
    }
  }, [dispatch, currentPage]);

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
                    <img
                      onClick={() => setShowModal(true)}
                      className="w-screen h-full border-2 border-[#D3B616] rounded-lg"
                      src={e.image}
                    />
                    <div>
                      {showModal ? (
                        <>
                          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none h-full w-full">
                            {/*content*/}
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                              {/*body*/}
                              <div className="relative p-5  flex-auto">
                                <img
                                  className="h-full w-full pt-5"
                                  src={e.image}
                                  alt={`${e.image}+${index}`}
                                />
                              </div>
                              {/*footer*/}
                              <div className="flex items-center justify-end p-2 border-t border-solid border-slate-200 rounded-b">
                                <button
                                  className="text-[#B35642] background-transparent font-bold uppercase px-6  text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={() => setShowModal(false)}
                                >
                                  Cerrar
                                </button>
                              </div>
                            </div>
                          </div>
                          <div
                            className="opacity-25 fixed inset-0 z-40 bg-black"
                            onClick={() => setShowModal(false)}
                          ></div>
                        </>
                      ) : null}
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
                      <img
                        className="rounded-lg h-full  w-screen object-cover border border-white"
                        src={e.image}
                        alt={`${e.image}+${index}`}
                      />
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
