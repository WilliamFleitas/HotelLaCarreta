import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
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
  interface contactInputType {
    name: string;
    lastName: string;
    email: string;
    subject: string; 
    message: string;
  };
  type contactType = z.infer<typeof ContactSchema >;

export const Contact = () => {
  const BackUrl = import.meta.env.VITE_BACK_URL as string;
  const navigate = useNavigate();
    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue,
    } = useForm<contactType>({
        resolver: zodResolver(ContactSchema)
    });
    const [inputContact, setInputContact] = useState<contactInputType>({
      name: "",
      message: "",
      subject: "",
      lastName: "",
      email: "",

    });
    const onSubmit = handleSubmit( async ({name,message, subject, lastName, email}) => {
        const newObj = {
          name,
          message,
          subject,
          lastName,
          email
        }
        axios.post(`${BackUrl}/reservations/emailcontact`, newObj).then((data) => Swal.fire({
          icon: "success",
          title: "¡Se envio el correo!",
          timer: 2000,
          showConfirmButton: false,
        }).then((result) => {
          if (result) {
            setInputContact({...inputContact, name: "", email: "", subject: "", message: "", lastName: ""})
            navigate("/home");
          }
        })).catch((err) => Swal.fire({
          icon: "error",
          title: `No se ha podido enviar el correo, intentelo de nuevo en un momento!, ${err.message}`,
          timer: 2000,
        }));
    });

  return (
    <form className="text-black text-center justify-center pt-0 p-5 overflow-x-hidden" onSubmit={onSubmit}>
      <div className="text-center justify-center items-center flex flex-col  bg-[#B35642] w-full">
      <div className=" text-start justify-start items-start p-5">
        <div className="grid grid-cols-2 space-x-2"> 
        <div>
        <label className="text-sm left-4 text-[#B35642] relative top-[8px]  bg-black border-2 border-black w-fit px-1 rounded-xl">Nombre</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2 text-center shadow-md shadow-white`} placeholder="Ingrese su nombre..." value={inputContact.name} type="text" id="name" {...register("name")} onChange={(e) => setInputContact({...inputContact, name: e.target.value })}/>
        {errors?.name && (
          <p className="text-sm text-black md:pt-3">{errors.name.message}</p>
        )}
        </div>

        <div>
        <label className="text-sm left-4 text-[#B35642] relative top-[8px]  bg-black border-2 border-black w-fit px-1 rounded-xl">Apellido</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2 text-center shadow-md shadow-white`} type="text" id="lastName" value={inputContact.lastName} placeholder="Ingrese su apellido..." {...register("lastName")} onChange={(e) => setInputContact({...inputContact, lastName: e.target.value })}/>
        {errors?.lastName && (
          <p className="text-sm text-black md:pt-3">{errors.lastName.message}</p>
        )}
        </div>
        </div>

        <label className="text-sm left-4 text-[#B35642] relative top-[8px]  bg-black border-2 border-black w-fit px-1 rounded-xl" >Asunto</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2 text-center shadow-md shadow-white`} placeholder="Escriba el motivo..." value={inputContact.subject} type="text" id="subject" {...register("subject")} onChange={(e) => setInputContact({...inputContact, subject: e.target.value })}/>
        {errors?.subject && (
          <p className="text-sm text-black md:pt-3">{errors.subject.message}</p>
        )}

        <label className="text-sm left-4 text-[#B35642] relative top-[8px]  bg-black border-2 border-black w-fit px-1 rounded-xl">Email</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2 text-center shadow-md shadow-white`} type="text" placeholder="Ingrese su email..." value={inputContact.email} id="email" {...register("email")} onChange={(e) => setInputContact({...inputContact, email: e.target.value })}/>
        {errors?.email && (
          <p className="text-sm text-black md:pt-3">{errors.email.message}</p>
        )}
        <label className="text-sm left-4 text-[#B35642] relative top-[8px]  bg-black border-2 border-black w-fit px-1 rounded-xl">Mensaje</label>
        <input className={`w-full border border-black rounded-xl px-3 py-2 text-center shadow-md shadow-white`} placeholder="Ingrese su consulta/mensaje..." value={inputContact.message} type="text" id="message" {...register("message")} onChange={(e) => setInputContact({...inputContact, message: e.target.value })}/>
        {errors?.message && (
          <p className="text-sm text-black md:pt-3">{errors.message.message}</p>
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
