import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form" ;
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useAppDispatch } from "../../hooks";
const trimString = (u: unknown) => (typeof u === "string" ? u.trim() : u);

const logSchema = z.object({
    email:  z.preprocess(
        trimString,
        z
          .string().email()
      ),
      password: z.preprocess(
        trimString,
        z
          .string()
          .min(5, { message: "Ingresa una contraseña valida" })
      ),
});
type logType = z.infer<typeof logSchema>;

export const Login = () => {
    const BackUrl = (import.meta.env.VITE_BACK_URL as string);
    const [loginErrors, setLoginErrors ] = useState<string>("");

    const dispatch = useAppDispatch();
    const {
        register,
        formState: { errors },
        handleSubmit,
        setValue,
      } = useForm<logType>({
        resolver: zodResolver(logSchema),
      });
    

    const onSubmit = handleSubmit(async (formData) => {
       
        setLoginErrors("");
        axios.post(`${BackUrl}/api/auth/signin`, formData ).then(({data}) => {
            
            
            localStorage.setItem("userSession", JSON.stringify(data.token));
            window.location.replace("/admin/dashboard");
            
        }).catch((e: any) =>{
            
            setLoginErrors(e.response?.data?.errors?.[0] ? e.response?.data?.errors?.[0].msg.toString() : e.response?.data );
        });
    });
    return (
        <form className="text-black pt-20 text-center justify-center items-center" onSubmit={onSubmit}>
            {/* <div>
            {
                user?.admin ? <h2>admin</h2> : <h3>no admin</h3>
            }
            </div> */}
            <div className="bg-zinc-200 w-full h-full  grid grid-cols-1 p-5"> 
            
                <label>Ingrese correo</label>
                <input type={"text"} id="user" {...register("email")} />

                {errors?.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}

                <label>Ingrese contraseña</label>
                <input type={"password"} id="password" {...register("password")}/>
              
                {errors?.password && (
          <p className="text-sm text-red-400">{errors.password.message}</p>
        )}

            </div>
            <div className="p-5">
            <div className="bg-amber-400">
                <button type="submit">Iniciar sesión</button>
            </div>
             {
                loginErrors ? 
                <div>
                <p className="text-red-500">{loginErrors}</p>
                </div>
                :
                <></>
             }
            </div>
        </form>
    )
};