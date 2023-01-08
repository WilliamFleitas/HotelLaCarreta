import React,{useState, useEffect} from "react";
import {string, z} from "zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from '@hookform/resolvers/zod';




const MAX_FILE_SIZE = 900000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const rgx = /^\s*$/g;

const trimString = (u: unknown) => typeof u === "string" ? u.trim() : u;

const RoomSchema = z.object({
    name: z.preprocess(trimString,  z.string().min(5, {message: "Ingresa por lo menos 5 caracteres"}).max(30, {message: "El limite es de 30 caracteres"})),

    description: z.preprocess(trimString, z.string().min(15, {message: "Ingresa por lo menos 15 caracteres"}).max(200, {message: "El limite es de 200 caracteres"})),

    preDescription: z.preprocess(trimString, z.string().min(15, {message: "Ingresa por lo menos 15 caracteres"}).max(50, {message: "El limite es de 50 caracteres"})),

    images: z.instanceof(FileList)
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Max image size is 9MB.`)
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),

    price: z.coerce.number().min(1, {message: "Precio es requerido"}),

    capacity: z.coerce.number().min(1, {message: "Precio es requerido"}),

    roomZone: z.enum(["Moderna", "Rustica"]),

    bathroom_features: z.preprocess(trimString, z.string().min(1, {message: "Caracteristica requerida"}).max(60, {message: "El limite es de 60 caracteres"})),

    room_services: z.preprocess(trimString, z.string().min(1, {message: "Caracteristica requerida"}).max(60, {message: "El limite es de 60 caracteres"})),

    room_features: z.preprocess(trimString, z.string().min(1, {message: "Caracteristica requerida"}).max(60, {message: "El limite es de 60 caracteres"})),
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
    formState: {errors},
    handleSubmit,
    setValue,
} = useForm<roomsType>({
    resolver: zodResolver(RoomSchema)
});

const initialForm: featureType = {
    
    room_features: "",
    room_services: "",
    bathroom_features: "",

}


const [featureInput, setFeatureInput] = useState(initialForm);

const [newRoomFeature, setNewRoomFeature] = useState<string[]>([]);
const [newBathroomFeature, setNewBathroomFeature] = useState<string[]>([]);
const [newRoomService, setNewRoomService] = useState<string[]>([]);

const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("input", e.target.value);
    e.preventDefault();
    const valueTrim = e.target.value.trim();
    if(valueTrim.length < 1){
        return ;
    }
    else {
        setFeatureInput({
            ...featureInput, [e.target.id]: valueTrim
        })
        
    }
 };

const addNewFeature = (e: string, name: string) => {

console.log(e);
if(e.length < 1 ) {
    return ;
}
else {
    switch (name){
        case "room_services":
            setNewRoomService([...new Set([...newRoomService, e]) ]);
            setFeatureInput({
                ...featureInput, [name]: ""
            })
            break;
        case "bathroom_features":
            setNewBathroomFeature([...new Set([...newBathroomFeature, e]) ]);
            setFeatureInput({
                ...featureInput, [name]: ""
            })
            break;
        case "room_features":
            setNewRoomFeature([...new Set([...newRoomFeature, e]) ]);
            setFeatureInput({
                ...featureInput, [name]: ""
            })
            break;
        default:
            return ;
    }
    
}


};

console.log("roomfeature", newRoomFeature);
console.log("newBathroomFeature", newBathroomFeature);
console.log("newRoomService", newRoomService);

const onSubmit = handleSubmit(async ({name, images, description, preDescription, price, capacity, roomZone}) => {
   const newObject = {
    name,
    images,
    description,
    preDescription,
    price, 
    capacity,
    roomZone,
    room_features: newRoomFeature,
    room_services: newRoomService,
    bathroom_features: newBathroomFeature,
   };
   console.log(newObject);
   
});

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
               <input type="text" id="preDescription" {...register("preDescription")}/> 

               {errors.preDescription && (
                <p className="text-red-600 font-bold">{errors.preDescription.message}</p>
                )}

               <label>Imagenes</label>
               <input type="file" multiple id="images" {...register("images")}/> 

               {errors.images && (
                <p className="text-red-600 font-bold">{errors.images.message}</p>
                )}

               <label>Precio</label>
               <input type="number"  id="price" min="1" {...register("price")}/>

               {errors.price && (
                <p className="text-red-600 font-bold">{errors.price.message}</p>
                )}
               <label>Capacidad</label>
               <input type="number" id="capacity" min="1" {...register("capacity")}/> 

               {errors.capacity && (
                <p className="text-red-600 font-bold">{errors.capacity.message}</p>
                )}
               <div>

               <label>Zona de la habitación</label>
               <select placeholder="Moderna o Rustica" id="roomZone" {...register("roomZone")}>
                <option>Moderna</option>
                <option>Rustica</option>
                </select> 

               {errors.roomZone && (
                <p className="text-red-600 font-bold">{errors.roomZone.message}</p>
                )}
               </div>
               
               <div>
               <label>Caracteristicas de la habitacion</label>
               <input placeholder="Caracteristicas " type="text" id="room_features"  {...register("room_features")} onChange={(e) => handleInput(e)}/>
                <button onClick={() => addNewFeature(featureInput.room_features, "room_features")}>Agregar</button>

               {errors.room_features && (
                <p className="text-red-600 font-bold">{errors.room_features.message}</p>
                )}
                </div>
                {/* {
                  newRoomFeature  
                } */}
                
                <div>
               <label>Caracteristicas del baño</label>
               <input type="text" id="bathroom_features" {...register("bathroom_features")} onChange={(e) => handleInput(e)}/> 
               <button onClick={() => addNewFeature(featureInput.bathroom_features, "bathroom_features")}>Agregar</button>
               {errors.bathroom_features && (
                <p className="text-red-600 font-bold">{errors.bathroom_features.message}</p>
                )}
                </div>

               <label>Servicios de la habitación</label>
               <input type="text" id="room_services" {...register("room_services")} onChange={(e) => handleInput(e)}/>
               <button onClick={() => addNewFeature(featureInput.room_services, "room_services")}>Agregar</button>
               {errors.room_services && (
                <p className="text-red-600 font-bold">{errors.room_services
                    .message}</p>
                )}

            </div>
            <button className="w-fit px-2 duration-300 hover:bg-gray-200 hover:duration-300 py-2 rounded-sm bg-yellow font-bold my-1.5 mb-8" type="submit" >
        Crear habitación
            </button>
        </form>
    )
};