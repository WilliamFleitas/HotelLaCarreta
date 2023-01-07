import React, { useEffect, useState } from "react";
import { EditRoomProps } from "../../types/Reservation";
import { useForm } from "react-hook-form";
import axios from "axios";
import { response } from "express";
import { AiFillCloseCircle } from "react-icons/ai";

interface IForm {
  name: string;
  price: number;
  capacity: number;
  images: Array<File>;
  enabled: Boolean;
  preDescription: string;
  description: string;
}

const EditRoomForm = ({ edit, setEdit, data }: EditRoomProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IForm>();

  const onSubmit = handleSubmit(async (formData) => {
    console.log(formData);
    await axios
      .put(`http://localhost:3001/rooms/${data.id}`, { formData })
      .then((response) => console.log(response));
  });

  const [images, setImages] = useState(Array<File>);

  const onChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let imagesArray: Array<File> = images;
    if (e.target.files) {
      for (let i = 0; i < e.target.files.length; i++) {
        let newImage: File = e.target.files[i];
        console.log("bucle ", i);
        imagesArray.push(newImage);
      }
    }
    setImages(imagesArray);
  };

  return (
    <form
      className="p-4 flex flex-col items-center w-[300px]"
      onSubmit={onSubmit}
    >
      <p className="text-lg font-bold">Editar habitacion</p>
      <div className="flex flex-col w-full">
        <label
          htmlFor=""
          className="text-sm text-gray-600 relative top-[8px] left-3 bg-white w-fit px-1 rounded-xl"
        >
          Nombre
        </label>
        <input
          type="text"
          placeholder={data.name}
          className={`w-full border border-gray-400 rounded-xl px-3 py-2`}
          {...register("name", {
            required: { value: true, message: "Campo obligatorio." },
            maxLength: {
              value: 32,
              message: "No debe contener mas de 32 caracteres",
            },
          })}
        />
        {errors.name?.message && (
          <p className="text-sm text-red-400">
            {errors.name?.message.toString()}
          </p>
        )}
      </div>

      <div className="flex flex-row gap-2">
        <div className="flex flex-col w-full">
          <label
            htmlFor=""
            className="text-sm text-gray-600 relative top-[8px] left-3 bg-white w-fit px-1 rounded-xl"
          >
            Precio
          </label>
          <input
            type="number"
            placeholder={data.price.toString()}
            className="w-full border border-gray-400 rounded-xl px-3 py-2"
            {...register("price", {
              required: { value: true, message: "Campo obligatorio." },
            })}
          />
          {errors.price?.message && (
            <p className="text-sm text-red-400">
              {errors.price?.message.toString()}
            </p>
          )}
        </div>
        <div className="flex flex-col w-full">
          <label
            htmlFor=""
            className="text-sm text-gray-600 relative top-[8px] left-3 bg-white w-fit px-1 rounded-xl"
          >
            Capacidad
          </label>
          <input
            placeholder={data.capacity.toString()}
            className="w-full border border-gray-400 rounded-xl px-3 py-2"
            {...register("capacity", {
              required: { value: true, message: "Campo obligatorio." },
            })}
          />
          {errors.capacity?.message && (
            <p className="text-sm text-red-400">
              {errors.capacity?.message.toString()}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col w-full">
        <label
          htmlFor=""
          className="text-sm text-gray-600 relative top-[8px] left-3 bg-white w-fit px-1 rounded-xl"
        >
          Imagenes
        </label>
        <input
          type="file"
          multiple
          // placeholder={}
          className="w-full border border-gray-400 rounded-xl px-3 py-2"
          onChange={onChangeFiles}
        />
        <div className="w-full flex flex-row gap-4 items-start justify-center flex-wrap">
          {images.map((imagen: File) => (
            <div className="w-fit">
              <AiFillCloseCircle
                className="w-6 h-6 text-red-500 cursor-pointer hover:scale-110 duration-300 hover:text-red-300 relative top-6"
                onClick={() => {
                  const imgs = images.filter((img) => img != imagen);
                  setImages(imgs);
                }}
              />
              <img
                src={URL.createObjectURL(imagen)}
                className="w-24 border rounded-xl"
              />
            </div>
          ))}
        </div>

        {errors.images?.message && (
          <p className="text-sm text-red-400">
            {errors.images?.message.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-row w-full gap-2 mt-4 justify-center">
        <label htmlFor="" className="text-sm text-gray-600 w-fit">
          Deshabilitar
        </label>
        <input
          type="checkbox"
          // placeholder={}
          className="w-fit border border-gray-400 rounded-xl px-3 py-2"
          {...register("enabled")}
        />
      </div>

      <div className="flex flex-col w-full">
        <label
          htmlFor=""
          className="text-sm text-gray-600 relative top-[8px] left-3 bg-white w-fit px-1 rounded-xl"
        >
          Mini descripcion
        </label>
        <textarea
          placeholder={data.preDescription}
          className="w-full border border-gray-400 rounded-xl px-3 py-2 h-18"
          {...register("preDescription", {
            required: { value: true, message: "Campo obligatorio." },
          })}
        />
        {errors.preDescription?.message && (
          <p className="text-sm text-red-400">
            {errors.preDescription?.message.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-col w-full">
        <label
          htmlFor=""
          className="text-sm text-gray-600 relative top-[8px] left-3 bg-white w-fit px-1 rounded-xl"
        >
          Descripcion
        </label>
        <textarea
          placeholder={data.description}
          className="w-full border border-gray-400 rounded-xl px-3 py-2 h-32"
          {...register("description", {
            required: { value: true, message: "Campo obligatorio." },
          })}
        />
        {errors.description?.message && (
          <p className="text-sm text-red-400">
            {errors.description?.message.toString()}
          </p>
        )}
      </div>
      <div className="flex flex-row w-full justify-between px-4">
        <button
          type="submit"
          className="bg-green-500 py-1 px-2 rounded-lg text-white mt-4 duration-300 hover:scale-110 hover:bg-green-300"
        >
          Guardar
        </button>
        <button
          type="submit"
          className="bg-red-500 py-1 px-2 rounded-lg text-white mt-4 duration-300 hover:scale-110 hover:bg-red-300"
          onClick={(e) => {
            e.preventDefault();
            setEdit(!edit);
          }}
        >
          Cancelar
        </button>
      </div>
      <button onClick={() => console.log(images)}>Ver estado</button>
    </form>
  );
};

export default EditRoomForm;
