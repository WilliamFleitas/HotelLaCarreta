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


const FacilitieSchema = z.object({
    name: z.string().min(3, { message: "Ingresa por lo menos 3 caracteres" }),
    description: z.string().min(5, { message: "Ingresa por lo menos 5 caracteres" }),
    images: z.instanceof(FileList).nullable()
});

type facilitiesType = z.infer<typeof FacilitieSchema>;


export const FacilitiesTable = () => {
    const BackUrl = import.meta.env.VITE_BACK_URL as string;
    
    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
        reset
    } = useForm<facilitiesType>({
        resolver: zodResolver(FacilitieSchema)
    });


  const facilities = useAppSelector((state) => state.facilities.facilitiesList);
  const loading = useAppSelector((state) => state.facilities.loading);
  
  const dispatch = useAppDispatch();

   

   const [images, setImages] = useState<File[]>([]);
  let imgUrls: string[] | null;
  let newImage: File[] = [];
   
   const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    newImage = Array.from(e.target.files);
    
      setImages(newImage);
    
  };

  const handleDelete = (id: string) => {
    axios.delete(`${BackUrl}/facilities/${id}`).then(() => {
        
        Swal.fire({
            icon: "success",
            title: "¡Se elimino la instalación!",
            timer: 2000,
            showConfirmButton: false,
          }).then((result) => {
            if (result) {
              
                dispatch(getAllFacilities());
            }
          })
    }).catch((e) =>  Swal.fire({
        icon: "error",
        title: `No se pudo eliminar!, ${e.message}`,
        timer: 2000,
      }))
  };

  const onSubmit = handleSubmit(async({
    name, description
   }) => {
        
        imgUrls = await uploadImageDb(images, "Facilities");
        const session = JSON.parse(
            window.localStorage.getItem("userSession") as string
          );
          const newObject = {
            name,
            image: imgUrls?.[0],
            description,
          };
          if (images.length > 0) {
            axios
              .post(`${BackUrl}/facilities`, newObject, {
                headers: {
                  "auth-token": `${session}`,
                },
              })
              .then((res) => {
                Swal.fire({
                  icon: "success",
                  title: "¡Se creo la Instalación!",
                  timer: 2000,
                  showConfirmButton: false,
                }).then((result) => {
                  if (result) {
                    dispatch(getAllFacilities());
                    reset(formValues => ({
                      ...formValues,
                      description: "",
                      name: "",
                    }));
                    setImages([]);
                  }
                })
                
              })
              .catch((err) => {
                Swal.fire({
                  icon: "error",
                  title: `No se pudo crear la instalación!, ${err.message}`,
                  timer: 2000,
                }).then((res) => {
                  window.location.reload();
                })
              });
          }else {
            if(images.length <= 0){
                alert("Se necesita una imagen para crear la instalación")
            }
          }
   });


  useEffect(() => {
    dispatch(getAllFacilities());
  }, [dispatch]);

  return (
    <div className="text-center items-center justify-center pt-5">
        <h2>Agregar instalación</h2>

        <div  >
            <form className="flex flex-col p-5 bg-[#ac796e] m-5 border border-zinc-400 rounded-md text-black text-center items-center justify-center" onSubmit={onSubmit}>
                
            <label className="text-sm text-black relative top-[3px] right-center bg-[#B35642] border-2 border-black w-fit px-1 rounded-xl">Nombre de la instalación</label>
            <input className="rounded-md px-2" type="text" id="name" {...register("name")}></input>
            {errors.name && (
              <p className="pt-5 text-sm text-red-400">
                {errors.name.message}
              </p>
            )}
            


            
            <label className="text-sm text-black relative top-[3px] right-center bg-[#B35642] border-2 border-black w-fit px-1 rounded-xl mt-5">Descripción</label>
            <input className="rounded-md px-2"  type="text" id="description" {...register("description")}></input>
            {errors.description && (
              <p className="pt-5 text-sm text-red-400">
                {errors.description.message}
              </p>
            )}


            <label className="my-5 text-sm text-black relative top-[0px] right-center bg-[#B35642] border-2 border-black w-fit px-1 rounded-xl">Imagen</label>
            <input className="rounded-md "   type="file" accept=".png, .jpg, .jpeg, .gif"
                  id="images"
                  key="images" {...register("images")} onChange={onChangeFiles}></input>
                  {errors.images && (
              <p className="pt-5 text-sm text-red-400">
                {errors.images.message}
              </p>
            )}
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
            <button className="w-fit mt-5 px-2 duration-300 text-white bg-[#B35642]  hover:bg-[#ec775f] hover:duration-300 py-2 rounded-lg font-bold my-1.5 mb-8 " type="submit">Crear instalación</button>
            </form>
        </div>


      <h2>Todas las instalaciones</h2>

      <div className="h-[500px] min-w-[600px] overflow-y-auto p-5">
        {facilities.length > 0 ? facilities.map((e) => {
          return (
            <div key={e.id} className="p-5 flex flex-row gap-14 bg-[#ac796e] border-2 border-zinc-400 rounded-md text-black">
              
              <img className="h-[150px]  w-[150px] object-cover rounded-md" src={e.image} alt={e.image} />
              <div >
              <h2 className="py-5">Nombre: {e.name}</h2>
              <p>Descripción: {e.description}</p>
              </div>
              <button className="bg-red-500 border border-black rounded-md w-[80px] h-full m-auto text-black hover:bg-red-300" type="button" onClick={() => handleDelete(e.id)}>Eliminar</button>
            </div>
          );
        }): loading ? (
          <div className="text-black pt-36 mt-36 items-center justify-center text-center">
          <svg
            className="animate-spin h-5 w-5 m-auto bg-red-500 "
            viewBox="0 0 24 24"
          ></svg>
          <h2>Cargando...</h2>
        </div>
        ) : <div><h2>No se encontraron instalaciones</h2></div>}
      </div>
    </div>
  );
};
