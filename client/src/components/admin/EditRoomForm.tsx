import React, { useEffect, useState } from "react";
import { EditRoomProps, Room } from "../../types/Reservation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiFillCloseCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { featureType } from "./CreateRoom";
import { uploadImageDb } from "../../firebaseImg/uploadImageDb";

const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u);

const EditRoomSchema = z.object({
  name: z.preprocess(
    trimString,
    z
      .string()
      .min(5, { message: "Ingresa por lo menos 5 caracteres" })
      .max(30, { message: "El limite es de 30 caracteres" })
  ),

  description: z.preprocess(
    trimString,
    z
      .string()
      .min(15, { message: "Ingresa por lo menos 15 caracteres" })
      .max(200, { message: "El limite es de 200 caracteres" })
  ),

  preDescription: z.preprocess(
    trimString,
    z
      .string()
      .min(15, { message: "Ingresa por lo menos 15 caracteres" })
      .max(50, { message: "El limite es de 50 caracteres" })
  ),
  price: z.coerce.number().min(1, { message: "Precio es requerido" }),

  capacity: z.coerce.number().min(1, { message: "Precio es requerido" }),

  roomZone: z.enum(["Moderna", "Rustica"]),

  bathroom_features: z.preprocess(
    trimString,
    z
      .string()
      .min(1, { message: "Ingrese por lo menos 2 caracteristicas y vuelva a intentar" })
      .max(60, { message: "El limite es de 60 caracteres" })
  ),

  room_services: z
  .preprocess(
    trimString,
    z.coerce.string()
      .min(1, { message: "Ingrese por lo menos 2 caracteristicas y vuelva a intentar" })
      .max(60, { message: "El limite es de 60 caracteres" })
      
  ),

  room_features: z.preprocess(
    trimString,
    z
      .string()
      .min(1, { message: "Ingrese por lo menos 2 caracteristicas y vuelva a intentar" })
      .max(60, { message: "El limite es de 60 caracteres" })
  ),
});

type editRoomsType = z.infer<typeof EditRoomSchema>;
const EditRoomForm = ({ edit, setEdit, data }: EditRoomProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<editRoomsType>({
    resolver: zodResolver(EditRoomSchema),
  });
  const BackUrl = (import.meta.env.VITE_BACK_URL as string);
  console.log("data1", data)
  

  const initialForm: featureType = {
    room_features: "",
    room_services: "",
    bathroom_features: "",
  };
  const [featureInput, setFeatureInput] = useState(initialForm);

  const [newRoomFeature, setNewRoomFeature] = useState<string[]>([]);
  const [newBathroomFeature, setNewBathroomFeature] = useState<string[]>([]);
  const [newRoomService, setNewRoomService] = useState<string[]>([]);
  const [preImages, setPreImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  let imgUrls: string[] | null;
  let newImages: File[] = [];

  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;
    newImages = Array.from(e.target.files);
    if(newImages.length > 5 || images.length > 5){
      return alert("Limite de 5 imagenes");
    }
    else if(images.length >= 1) {
      const num = images.length;
      if(num === 1){
        setImages([...images, ...newImages.slice(0, 4)]); 
      }
      if(num === 2){
        setImages([...images, ...newImages.slice(0, 3)]); 
      }
      if(num === 3){
        setImages([...images, ...newImages.slice(0, 2)]); 
      }
      if(num === 4){
        setImages([...images, ...newImages.slice(0, 1)]); 
      }
    }
    else {
      console.log("imglength", newImages)
      setImages([...images, ...newImages.slice(0, 5)]); 
      
    }
    
  };

  const handleDeleteImg = (e: string, index: number) => {
    setPreImages((items) => items.filter((x) => x !== e));
   
 };

 const handleDeleteNewImg = (e: File, index: number) => {
  setImages((items) => items.filter((x) => x !== e));
 
};

 const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
  if(e.target.value.trim().length === 0){
    return ;
  }else{
    setFeatureInput({
      ...featureInput,
      [e.target.id]: e.target.value,
    });
    
  }
};

const addNewFeature = (e: string, name: string) => {
  if (e.length < 1) {
    return;
  } else {
    switch (name) {
      case "room_services":
        setNewRoomService([...new Set([...newRoomService, e])]);
        setFeatureInput({
          ...featureInput,
          [name]: "",
        });
        break;
      case "bathroom_features":
        setNewBathroomFeature([...new Set([...newBathroomFeature, e])]);
        setFeatureInput({
          ...featureInput,
          [name]: "",
        });
        break;
      case "room_features":
        setNewRoomFeature([...new Set([...newRoomFeature, e])]);
        setFeatureInput({
          ...featureInput,
          [name]: "",
        });
        break;
      default:
        return;
    }
  }
};

const handleDeleteFeature = (e: string, name: string) => {
  if (e.length < 1) {
    return;
  } else {
    switch (name) {
      case "room_services":
        setNewRoomService((items) => items.filter((x) => x !== e));
        break;
      case "bathroom_features":
        setNewBathroomFeature((items) => items.filter((x) => x !== e));
        break;
      case "room_features":
        setNewRoomFeature((items) => items.filter((x) => x !== e));
        break;
      default:
        return;
    }
  }
};

const onSubmit = handleSubmit(
  async ({
    name,
    description,
    preDescription,
    price,
    capacity,
    roomZone,
  }) => {
    
    imgUrls = await uploadImageDb(images, "Rooms");
    
    const newObject = {
      name,
      images: imgUrls?.concat(preImages),
      description,
      preDescription,
      price,
      capacity,
      roomZone,
      room_features: newRoomFeature,
      room_services: newRoomService,
      bathroom_features: newBathroomFeature,
    };
    if(images.length > 0 ){
      axios.put(`${BackUrl}/rooms/${data.id}`, newObject).then((res) => {
        alert("Se actualizo la habitación");
        // window.location.reload();

      }).catch((res) => {
        console.log(res)
        alert("No se actualizo la habitación")
      })
    }
  }
);

useEffect(() => {
  setNewRoomFeature(data.room_features);
  setNewBathroomFeature(data.bathroom_features);
  setNewRoomService(data.room_services);
  setPreImages(data.images);
}, []);
const asdas: any = images.concat(preImages as any) as any;
console.log(asdas);
console.log("asd2", newRoomFeature);
console.log("asd", images);
  return (
    <form className="pt-[40px] my-10 rounded-lg bg-[#928282] text-black p-4 flex flex-col w-[335px] h-full justify-center items-center align-center text-center border-2" onSubmit={ onSubmit}>
      <p className="text-lg font-bold">Editar habitación</p>
      <div className=" text-black flex flex-col w-full ">
        <label className="text-sm text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl relative top-[8px] left-3   w-fit px-1 ">Nombre de la habitación</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2`} placeholder={data.name} value={data.name} type="text" id="name" {...register("name")} />

        {errors?.name && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}
        
        <label className="text-sm text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl    relative top-[8px] left-3 w-fit px-1 ">Descripción</label>
        <textarea  id="description" placeholder={data.description} value={data.description} className="w-full border border-black rounded-xl px-3 py-2 p-2 text-black h-full text-start" {...register("description")}></textarea>

        {errors.description && (
          <p className="text-sm text-red-400">{errors.description.message}</p>
        )}

        <label className="text-sm  relative top-[8px] left-3 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl  w-fit  px-1 ">Mini Descripción</label>
        <input className="w-full border  border-black rounded-xl px-3 py-2 h-18" 
          type="text"
          placeholder={data.preDescription}
          value={data.preDescription}
          id="preDescription"
          {...register("preDescription")}
        />

        {errors.preDescription && (
          <p className="text-sm text-red-400">
            {errors.preDescription.message}
          </p>
        )}
        <label className="text-sm relative top-[8px] left-3 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl  w-fit px-1 ">Imagenes</label>
        <div className="border border-black rounded-lg bg-white p-2 w-full">
        
        <div className="py-5  ">
        {
          images.length < 5 ? <input
          className=" py-2  text-white"
          type="file"
          multiple accept=".png, .jpg, .jpeg, .gif"
          id="images"
          key="images"
          onChange={onChangeFiles}
        /> : <></>
        }
        
        
        <div className="grid gap-x-0 gap-y-5 grid-cols-3  w-full">
        {preImages?.map((e: any, index: any) => {
          return (
            <div className="pt-3 h-28 " key={index}>
              
                <img
                  className="h-full  border border-black border-solid rounded "
                  src={e}
                  alt={`upload_image_${e}`}
                  key={e}
                />
                <button type="button" onClick={() => handleDeleteImg(e, index)}>{<MdDelete/>}</button>
              
            </div>
          );
        })}
        {images?.map((e: any, index: any) => {
          return (
            <div className="pt-3 h-28 " key={index}>
              
                <img
                  className="h-full  border border-black border-solid rounded "
                  src={URL.createObjectURL(e)}
                  alt={`upload_image_${e}`}
                  key={e}
                />
                <button type="button" onClick={() => handleDeleteNewImg(e, index)}>{<MdDelete/>}</button>
              
            </div>
          );
        })}
        </div>

        </div>
        </div>
        
        <label className="text-sm relative top-[8px] left-3 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl  w-fit px-1 ">Precio</label>
         <input className="w-full border border-black  rounded-xl px-3 py-2" type="number" id="price" min="1" placeholder={data.price.toString()} value={data.price} {...register("price")} />

        {errors.price && (
          <p className="text-sm text-red-400">{errors.price.message}</p>
        )}
        <label className="text-sm  relative top-[8px] left-3 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl  w-fit px-1">Capacidad</label>
        <input className="w-full border border-black rounded-xl px-3 py-2" type="number" id="capacity" min="1" placeholder={data.capacity.toString()} value={data.capacity} {...register("capacity")} />

        {errors.capacity && (
          <p className="text-sm text-red-400">{errors.capacity.message}</p>
        )}
        
        
        
          <label className="text-sm  relative top-[8px] left-3  w-fit px-1 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl ">Zona de la habitación</label>
          <select className="w-full border mb-10 border-black rounded-xl px-3 py-2"
            placeholder={data.roomZone}
            value={data.roomZone}
            id="roomZone"
            {...register("roomZone")}
          >
            <option>Moderna</option>
            <option>Rustica</option>
          </select>

          {errors.roomZone && (
            <p className="text-sm text-red-400">{errors.roomZone.message}</p>
          )}
       
       <label className="text-sm relative top-[8px] left-3  w-fit px-1 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl ">Caracteristicas de la habitacion</label>
        <div className="">
         
          <input className="w-[200px] border border-black rounded-xl px-3 py-2"
            placeholder="Caracteristicas "
            type="text"
            value={featureInput.room_features}
            id="room_features" 
            {...register("room_features")}
            name="room_features" 
            onChange={(e) => handleInput(e)}
          />
          <button className=" text-sm p-2 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl" id="buttoRoomFeat" type="button" name="buttonRoomFeat"
            onClick={() =>
              addNewFeature(featureInput.room_features, "room_features")
            }
          >
            Agregar
          </button>
          <div className="py-5">
          {newRoomFeature.length > 0 ? (
            newRoomFeature.map((e) => {
              return (
                <button className=" text-sm p-2 text-black border bg-white border-black rounded-xl ml-2" id="buttoRoomFeat"
                  key={e}
                  onClick={() => handleDeleteFeature(e, "room_features")}
                >
                  <p key={e}>{e}</p>
                </button>
              );
            })
          ) : (
            <></>
          )}
        </div>
          {errors.room_features && (
            <p className="pt-5 text-sm text-red-400">
              {errors.room_features.message}
            </p>
          )}
        </div>
        

        <label className="text-sm  relative top-[8px] left-3  w-fit px-1 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl ">Caracteristicas del baño</label>

        <div>
          <input className="w-[200px] border border-black rounded-xl px-3 py-2"
            type="text"
            id="bathroom_features" value={featureInput.bathroom_features}
            {...register("bathroom_features")}
            onChange={(e) => handleInput(e)}
          />
          <button className=" text-sm p-2 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl" id="buttobathRoomFeat" type="button" name="buttobathRoomFeat"
            onClick={() =>
              addNewFeature(featureInput.bathroom_features, "bathroom_features")
            }
          >
            Agregar
          </button>
          <div className="py-5 ">   
        {newBathroomFeature.length > 0 ? (
          newBathroomFeature.map((e) => {
            return (
              <button
              className=" text-sm p-2 text-black border border-black rounded-xl ml-2 bg-white"
                key={e}
                onClick={() => handleDeleteFeature(e, "bathroom_features")}
              >
                <p>{e}</p>
              </button>
            );
          })
        ) : (
          <></>
        )}
        </div>
          {errors.bathroom_features && (
            <p className="pt-5 text-sm text-red-400">
              {errors.bathroom_features.message}
            </p>
          )}
        </div>
        


        <label className="text-sm relative top-[8px] left-3  w-fit px-1 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl ">Servicios de la habitación</label>
        <div>
        <input className="w-[200px] border border-black rounded-xl px-3 py-2"
          type="text"
          id="room_services"
          value={featureInput.room_services}
          {...register("room_services")}
          onChange={(e) => handleInput(e)}
        />

        <button className=" text-sm p-2 text-white border bg-[#2f2e2e]  hover:bg-[#807e7d] rounded-xl" id="buttoRoomServ" type="button" name="buttonRoomServ"
          onClick={() =>
            addNewFeature(featureInput.room_services, "room_services")
          }
        >
          Agregar
        </button>
        <div className="py-5 ">
        {newRoomService.length > 0 ? (
          newRoomService.map((e) => {
            return (
              <button className=" text-sm p-2 text-black border bg-white border-black rounded-xl ml-2 "
                key={e}
                onClick={() => handleDeleteFeature(e, "room_services")}
              >
                <p>{e}</p>
              </button>
            );
          })
        ) : (
          <></>
        )}

        {errors.room_services && (
          <p className="pt-5 text-sm text-red-400">
            {errors.room_services.message}
          </p>
        )}

        </div>
        
      </div>

      </div>
      <button
        className="w-fit px-2 duration-300 text-white bg-[#2f2e2e]  hover:bg-[#807e7d] hover:duration-300 py-2 rounded-lg font-bold my-1.5 mb-8 "
        type="submit"
      >
        Editar habitación
      </button>
    </form>
  );
};

export default EditRoomForm;
