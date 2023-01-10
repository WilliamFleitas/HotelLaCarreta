import React, { useState, useEffect } from "react";
import { string, z } from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { uploadImageDb } from "../../firebaseImg/uploadImageDb";
import { MdDelete } from "react-icons/md";



const MAX_FILE_SIZE = 900000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const rgx = /^\s*$/g;

const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u);

const RoomSchema = z.object({
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

  images: z
    .instanceof(FileList)
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max image size is 9MB.`
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),

  price: z.coerce.number().min(1, { message: "Precio es requerido" }),

  capacity: z.coerce.number().min(1, { message: "Precio es requerido" }),

  roomZone: z.enum(["Moderna", "Rustica"]),

  bathroom_features: z.preprocess(
    trimString,
    z
      .string()
      .min(1, { message: "Caracteristica requerida" })
      .max(60, { message: "El limite es de 60 caracteres" })
  ),

  room_services: z.preprocess(
    trimString,
    z
      .string()
      .min(1, { message: "Caracteristica requerida" })
      .max(60, { message: "El limite es de 60 caracteres" })
  ),

  room_features: z.preprocess(
    trimString,
    z
      .string()
      .min(1, { message: "Caracteristica requerida" })
      .max(60, { message: "El limite es de 60 caracteres" })
  ),
});

type roomsType = z.infer<typeof RoomSchema>;
interface featureType {
  room_features: string;
  room_services: string;
  bathroom_features: string;
}
interface featureArrayType {
  room_features: string[];
  room_services: string[];
  bathroom_features: string[];
}
export const CreateRoom = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<roomsType>({
    resolver: zodResolver(RoomSchema),
  });

  const initialForm: featureType = {
    room_features: "",
    room_services: "",
    bathroom_features: "",
  };

  const [featureInput, setFeatureInput] = useState(initialForm);
 
 

  const [newRoomFeature, setNewRoomFeature] = useState<string[]>([]);
  const [newBathroomFeature, setNewBathroomFeature] = useState<string[]>([]);
  const [newRoomService, setNewRoomService] = useState<string[]>([]);
  
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input", e.target.value);
    if(e.target.value.trim().length === 0){
      return ;
    }else{
      setFeatureInput({
        ...featureInput,
        [e.target.id]: e.target.value,
      });
      
    }
      
    
  };
  console.log("featureinput", featureInput)
  const addNewFeature = (e: string, name: string) => {
    console.log("newfeature", e);
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
    console.log("evento", e, name);
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

  const [images, setImages] = useState<File[]>([]);
  let imgUrls: string[] | null;
  let newImages: File[] = [];

  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return;

    newImages = Array.from(e.target.files);
    setImages([...images, ...newImages]); 
    console.log("aha", images);
  };
  console.log("aha", images);
// al eliminar una imagen esta no cambia el length del input de imagenes
  const handleDeleteImg = (e: File, index: number) => {
    console.log("index", e, index)
    setImages((items) => items.filter((x) => x !== e));
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
        images: imgUrls,
        description,
        preDescription,
        price,
        capacity,
        roomZone,
        room_features: newRoomFeature,
        room_services: newRoomService,
        bathroom_features: newBathroomFeature,
      };
      console.log("holanda", newObject);
    }
  );
  
 
  return (
    <form className="pt-60 text-black flex flex-col" onSubmit={onSubmit}>
      <div className=" text-black flex flex-col">
        <label>Nombre de la habitación</label>
        <input type="text" id="name" {...register("name")} />

        {errors?.name && (
          <p className="text-red-600 font-bold">{errors.name.message}</p>
        )}

        <label>Descripción</label>
        <input type="text" id="description" {...register("description")} />

        {errors.description && (
          <p className="text-red-600 font-bold">{errors.description.message}</p>
        )}

        <label>Mini Descripción</label>
        <input
          type="text"
          id="preDescription"
          {...register("preDescription")}
        />

        {errors.preDescription && (
          <p className="text-red-600 font-bold">
            {errors.preDescription.message}
          </p>
        )}

        <label>Imagenes</label>
        
        <input
          className="style"
          type="file"
          multiple accept=".png, .jpg, .jpeg, .gif"
          id="images"
          key="images"
          
          {...register("images")}
          onChange={onChangeFiles}
        /> 
        {errors.images && (
          <p className="text-red-600 font-bold">{errors.images.message}</p>
        )}

        {images?.map((e: any, index: any) => {
          return (
            <div className="flex flex-wrap justify-start h-28 mt-4" key={index}>
              
                <img
                  className="h-full mr-4 border border-black border-solid rounded"
                  src={URL.createObjectURL(e)}
                  alt={`upload_image_${e}`}
                  key={e}
                />
                <button onClick={() => handleDeleteImg(e, index)}>{<MdDelete/>}</button>
              
            </div>
          );
        })}
        
        <label>Precio</label>
        <input type="number" id="price" min="1" {...register("price")} />

        {errors.price && (
          <p className="text-red-600 font-bold">{errors.price.message}</p>
        )}
        <label>Capacidad</label>
        <input type="number" id="capacity" min="1" {...register("capacity")} />

        {errors.capacity && (
          <p className="text-red-600 font-bold">{errors.capacity.message}</p>
        )}
        <div>
          <label>Zona de la habitación</label>
          <select
            placeholder="Moderna o Rustica"
            id="roomZone"
            {...register("roomZone")}
          >
            <option>Moderna</option>
            <option>Rustica</option>
          </select>

          {errors.roomZone && (
            <p className="text-red-600 font-bold">{errors.roomZone.message}</p>
          )}
        </div>

        <div>
          <label>Caracteristicas de la habitacion</label>
          <input
            placeholder="Caracteristicas "
            type="text"
            value={featureInput.room_features}
            id="room_features" 
            {...register("room_features")}
            name="room_features" 
            onChange={(e) => handleInput(e)}
          />
          <button 
            onClick={() =>
              addNewFeature(featureInput.room_features, "room_features")
            }
          >
            Agregar
          </button>

          {errors.room_features && (
            <p className="text-red-600 font-bold">
              {errors.room_features.message}
            </p>
          )}
        </div>
        <div>
          {newRoomFeature.length > 0 ? (
            newRoomFeature.map((e) => {
              return (
                <button
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

        <div>
          <label>Caracteristicas del baño</label>
          <input
            type="text"
            id="bathroom_features" value={featureInput.bathroom_features}
            {...register("bathroom_features")}
            onChange={(e) => handleInput(e)}
          />
          <button
            onClick={() =>
              addNewFeature(featureInput.bathroom_features, "bathroom_features")
            }
          >
            Agregar
          </button>
          {errors.bathroom_features && (
            <p className="text-red-600 font-bold">
              {errors.bathroom_features.message}
            </p>
          )}
        </div>

        {newBathroomFeature.length > 0 ? (
          newBathroomFeature.map((e) => {
            return (
              <button
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
        <label>Servicios de la habitación</label>
        <input
          type="text"
          id="room_services"
          value={featureInput.room_services}
          {...register("room_services")}
          onChange={(e) => handleInput(e)}
        />

        <button
          onClick={() =>
            addNewFeature(featureInput.room_services, "room_services")
          }
        >
          Agregar
        </button>
        {errors.room_services && (
          <p className="text-red-600 font-bold">
            {errors.room_services.message}
          </p>
        )}

        {newRoomService.length > 0 ? (
          newRoomService.map((e) => {
            return (
              <button
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
      </div>
      <button
        className="w-fit px-2 duration-300 hover:bg-gray-200 hover:duration-300 py-2 rounded-sm bg-yellow font-bold my-1.5 mb-8"
        type="submit"
      >
        Crear habitación
      </button>
    </form>
  );
};
