import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { getAllFacilities } from "../../redux/slices/FacilitiesSlice/FacilitieAction";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { uploadImageDb } from "../../firebaseImg/uploadImageDb";
import Swal from "sweetalert2";
import { getAllPost } from "../../redux/slices/GallerySlice/Galleryaction";


const GallerySchema = z.object({
    description: z.string().min(5, { message: "Ingresa por lo menos 5 caracteres" })
});

type facilitiesType = z.infer<typeof GallerySchema>;


export const GalleryTable = () => {
    const BackUrl = import.meta.env.VITE_BACK_URL as string;
    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
    } = useForm<facilitiesType>({
        resolver: zodResolver(GallerySchema)
    });


  const gallery = useAppSelector((state) => state.gallery.postList);
  const dispatch = useAppDispatch();

   

   const [images, setImages] = useState<File[]>([]);
  let imgUrls: string[] | null;
  let newImage: File[] = [];
   
   const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    newImage = Array.from(e.target.files);
    
      setImages(newImage);
      console.log(images, "yhola");
    
  };

  const handleDelete = (id: string) => {
    axios.delete(`${BackUrl}/gallery/${id}`).then(() => {
        
        Swal.fire({
            icon: "success",
            title: "¡Se elimino la publicación!",
            timer: 2000,
            showConfirmButton: false,
          }).then((result) => {
            if (result) {
              
                dispatch(getAllPost());
            }
          })
    }).catch((e) =>  Swal.fire({
        icon: "error",
        title: `No se pudo eliminar la publicación!, ${e.message}`,
        timer: 2000,
      }))
  };

  const onSubmit = handleSubmit(async({
     description
   }) => {
        
        imgUrls = await uploadImageDb(images, "Gallery");
        const session = JSON.parse(
            window.localStorage.getItem("userSession") as string
          );
          const newObject = {
            image: imgUrls?.[0],
            description,
          };
          console.log(newObject);
          if (images.length > 0) {
            axios
              .post(`${BackUrl}/gallery`, newObject, {
                headers: {
                  "auth-token": `${session}`,
                },
              })
              .then((res) => {
                Swal.fire({
                  icon: "success",
                  title: "¡Se creo la publicación!",
                  timer: 2000,
                  showConfirmButton: false,
                }).then((result) => {
                  if (result) {
                    
                    window.location.reload()
                  }
                })
                
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: `No se pudo crear la publicación!, ${err.message}`,
                  timer: 2000,
                })
              });
          }
   });


  useEffect(() => {
    dispatch(getAllPost());
  }, [dispatch]);

  return (
    <div className="text-center items-center justify-center">
        <h2>Agregar publicación</h2>

        <div  >
            <form className="flex flex-col p-5 bg-zinc-300 m-5 border border-black rounded-md text-black text-center items-center justify-center" onSubmit={onSubmit}>
                
            
            <label className="text-sm text-black relative top-[3px] right-center bg-[#B35642] border-2 border-black w-fit px-1 rounded-xl mt-5">Descripción de la publicación</label>
            <input className="rounded-md px-2"  type="text" id="description" {...register("description")}></input>
            {errors.description && (
              <p className="pt-5 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}


            <label className="my-5 text-sm text-black relative top-[0px] right-center bg-[#B35642] border-2 border-black w-fit px-1 rounded-xl">Imagen</label>
            <input className="rounded-md "   type="file" accept=".png, .jpg, .jpeg, .gif"
                  id="images"
                  key="images" onChange={onChangeFiles}/>
             <div className="">
                {images?.map((e: any, index: any) => {
                  return (
                    <div className="mt-5" key={index+e.image}>
                      <img
                        className="h-[250px] w-[250px] m-auto border border-black border-solid rounded "
                        src={URL.createObjectURL(e)}
                        alt={`upload_image_${e}`}
                        key={e}
                      />
                      
                    </div>
                  );
                })}
              </div>
            <button className="w-fit mt-5 px-2 duration-300 text-white bg-[#B35642]  hover:bg-[#ec775f] hover:duration-300 py-2 rounded-lg font-bold my-1.5 mb-8 " type="submit">Crear publicación</button>
            </form>
        </div>


      <h2>Todas las publicaciones</h2>

      <div className="h-[500px] min-w-[600px] overflow-y-auto p-5">
        {gallery?.map((e) => {
          return (
            <div key={e.id} className="p-5 grid grid-cols-2 bg-[#ac796e] border-2 border-zinc-400 rounded-md text-black m-auto text-center items-center justify-center">
              
              <img className="h-[150px] m-auto w-[150px] object-cover rounded-md" src={e.image} alt={e.image} />
              <div className="m-auto break-words p-5">
              <h2 className="m-auto break-words">Descripción: <hr></hr> {e.description}</h2>
              </div>
              <button className="bg-red-500 border border-black rounded-md w-[80px] h-full m-auto text-black hover:bg-red-300 " type="button" onClick={() => handleDelete(e.id)}>Eliminar</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};