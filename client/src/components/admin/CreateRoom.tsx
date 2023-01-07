import React from "react";

export const CreateRoom = () => {

    return (
        <form className="pt-60 text-black flex flex-col">
            <div className=" text-black flex flex-col">
                <label>Nombre de la habitación</label>
               <input type="text" />
               <label>Descripción</label>
               <input type="text"/> 
               <label>Mini Descripción</label>
               <input type="text"/> 
               <label>Imagenes</label>
               <input type="file" multiple/>  
               <label>Precio</label>
               <input type="number" defaultValue={0}/>
               <label>Capacidad</label>
               <input type="number" defaultValue={0}/> 

               <div>
               <label>Zona de la habitación</label>
               {/* <input type="text" placeholder="Moderna o Rustica" onChange={(e) => }/>  */}
               </div>
               
               <label>Caracteristicas de la habitacion</label>
               <input type="text"/> 
               <label>Caracteristicas del baño</label>
               <input type="text"/> 
               <label>Servicios de la habitación</label>
               <input type="text"/> 
            </div>
        </form>
    )
};