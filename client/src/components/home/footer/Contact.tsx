import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u);

const ContactSchema = z.object({
    name: z.preprocess(
      trimString,
      z
        .string()
        .min(5, { message: "Ingresa por lo menos 5 caracteres" })
        .max(40, { message: "El limite es de 40 caracteres" })
    ),
    lastName: z.preprocess(
        trimString,
        z
          .string()
          .min(5, { message: "Ingresa por lo menos 5 caracteres" })
          .max(40, { message: "El limite es de 40 caracteres" })
      ), 

      subject: z.preprocess(
        trimString,
        z
          .string()
          .min(5, { message: "Ingresa por lo menos 5 caracteres" })
          .max(40, { message: "El limite es de 40 caracteres" })
      ),
  
    message: z.preprocess(
      trimString,
      z
        .string()
        .min(15, { message: "Ingresa por lo menos 15 caracteres" })
        .max(200, { message: "El limite es de 200 caracteres" })
    ),
    email: z.string().email(),

  });

  type contactType = z.infer<typeof ContactSchema >;

export const Contact = () => {

    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
    } = useForm<contactType>({
        resolver: zodResolver(ContactSchema)
    });

    const onSubmit = handleSubmit( async ({name,message, subject, lastName, email}) => {
        console.log({name,message, subject, lastName, email})
    });

  return (
    <form className="text-black text-center justify-center pt-0 " onSubmit={onSubmit}>
      <div className="text-center justify-center items-center flex flex-col  bg-[#B35642] w-screen">
      <h2 className="text-white text-[23px] pt-5 pb-5">Contacto</h2>
      <p className="text-[18px]  text-white pb-5">
        Sientase libre de escribir cuando quiera!
      </p>
      <div className=" text-start justify-start items-start p-5">
        <div className="grid grid-cols-2 space-x-2"> 
        <div>
        <label className="text-sm left-4 text-[#B35642] relative top-[8px]  bg-black border-2 border-black w-fit px-1 rounded-xl">Nombre</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2 text-center shadow-md shadow-white`} placeholder="Ingrese su nombre..." type="text" id="name" {...register("name")} />
        {errors?.name && (
          <p className="text-sm text-red-400">{errors.name.message}</p>
        )}
        </div>

        <div>
        <label className="text-sm left-4 text-[#B35642] relative top-[8px]  bg-black border-2 border-black w-fit px-1 rounded-xl">Apellido</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2 text-center shadow-md shadow-white`} type="text" id="lastName" placeholder="Ingrese su apellido..." {...register("lastName")} />
        {errors?.lastName && (
          <p className="text-sm text-red-400">{errors.lastName.message}</p>
        )}
        </div>
        </div>

        <label className="text-sm left-4 text-[#B35642] relative top-[8px]  bg-black border-2 border-black w-fit px-1 rounded-xl" >Asunto</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2 text-center shadow-md shadow-white`} placeholder="Escriba el motivo..." type="text" id="subject" {...register("subject")} />
        {errors?.subject && (
          <p className="text-sm text-red-400">{errors.subject.message}</p>
        )}

        <label className="text-sm left-4 text-[#B35642] relative top-[8px]  bg-black border-2 border-black w-fit px-1 rounded-xl">Email</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2 text-center shadow-md shadow-white`} type="text" placeholder="Ingrese su email..." id="email" {...register("email")} />
        {errors?.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
        <label className="text-sm left-4 text-[#B35642] relative top-[8px]  bg-black border-2 border-black w-fit px-1 rounded-xl">Mensaje</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2 text-center shadow-md shadow-white`} placeholder="Ingrese su consulta/mensaje..." type="text" id="message" {...register("message")} />
        {errors?.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}
        </div>
        <div className="text-center items-center justify-center bg-white rounded-lg mt-5 border shadow-md shadow-black hover:bg-zinc-200">
        <button className="px-2 py-1 text-[#B35642] "
          type="submit"
        >
          Enviar
        </button>
        </div>
      </div>
      
      
    </form>
  );
};
