import React, { useState } from "react";
import { boolean } from "zod";

interface eventsObjects {
    name: string,
    eventType: string; 
    description: string;
    image: string;
};


export const Events = () => {

    const eventsObject: Array<eventsObjects> = [
        {
            name: "Reunión",
            eventType: "Evento privado",
            description: "Zona, reuniones, asdasd, asdasda asdasda asdasda asdasdas dasdas",
            image: "https://firebasestorage.googleapis.com/v0/b/lacarretaposada-e7d7b.appspot.com/o/events%2Freunion.png?alt=media&token=d480641f-3a24-4e57-8dbf-860e648f8c0e",
        },
        {
            name: "Cumpleaños",
            eventType: "Evento privado",
            description: "Organiza, aloja, permite, presenta(? obstenta",
            image: "https://firebasestorage.googleapis.com/v0/b/lacarretaposada-e7d7b.appspot.com/o/events%2Fcumple.png?alt=media&token=b2bc4acb-450b-4037-a679-1a406f953429",
        },
        {
            name: "Intercambio",
            eventType: "Evento publico",
            description: "Organiza, aloja, permite, presenta(? obstenta",
            image: "https://firebasestorage.googleapis.com/v0/b/lacarretaposada-e7d7b.appspot.com/o/events%2Fintercamb.png?alt=media&token=72f970d9-81b9-42e4-bf1a-242ca7d1f2e3",
        },
        {
            name: "Casamientos",
            eventType: "Evento privado",
            description: "Organiza, aloja, permite, presenta(? obstenta",
            image: "https://firebasestorage.googleapis.com/v0/b/lacarretaposada-e7d7b.appspot.com/o/events%2Ffiestas.png?alt=media&token=078aeddd-b6c6-45cc-845c-b8ff7bde5462",
        }
    ];

    const [switchI, setSwitchI] = useState(false);

    const handleSwitch = () => {

        if(switchI === false) setSwitchI(true);
        if(switchI === true) setSwitchI(false);
    };

    return (
        <div className="text-white  p-2 ">
            <h2 className="text-[35px] pt-20 pb-10 text-[#E2725B] text-center">También podes reservar eventos!</h2>
            <div className="grid grid-cols-4 text-[20px] ">
             {
                eventsObject.length > 0 ? eventsObject.map((e) => {
                    return (
                        <div className="p-1 text-[20px] ">
                            <img className="h-[450px] w-screen object-cover" src={e.image} alt={e.image}/>

                          <button onClick={handleSwitch} className=" relative w-full bottom-[50px] bg-[#E2725B] ">
                          <div className="text-start">
                            <h3 className="p-2">{e.eventType}</h3>
                            <h3 className=" p-2">{e.name}</h3>
                            {
                                   switchI ? 
                                    <div className="text-center flex flex-col  ">
                                        <p className="pt-3 p-2 ">{e.description}</p>
                                        <button className="text-center p-3 mt-10 text-[#E2725B]  bg-white ">Reserva de evento</button>
                                    </div>
                                        
                                    : <></>
                                }
                            </div>
                            </button>  
                            
                        </div>
                    )
                }): <div><h2>No se encontraron eventos..</h2></div>
             }
             </div>
             
        </div>
    )
};