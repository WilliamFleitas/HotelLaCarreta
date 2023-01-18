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
    const [currentDiv, setCurrentDiv] = useState<number | undefined>(undefined);

    const handleSwitch = (index: number | undefined) => {

        if(switchI === false){
            setCurrentDiv(index);
            setSwitchI(true);
        } 
        if(switchI === true){
            setCurrentDiv(undefined);
            setSwitchI(false);
            
        }
    };

    return (
        <div className="text-white lg:p-8 ">
            <h2 className="text-[35px] pt-20 pb-10 text-[#E2725B] text-center">También podes reservar eventos!</h2>
            <div className="grid grid-cols-4 p-2 gap-x-2">
             {
                eventsObject.length > 0 ? eventsObject.map((e:eventsObjects, index: number) => {
                    return (
                        <div className=" relative border border-[#B35642] rounded-md">
                            <img className="h-[550px] w-screen object-cover rounded-md" src={e.image} alt={e.image}/>
                        
                          
                          <div onClick={() => handleSwitch(index)} className={currentDiv !== index ? " bg-white bg-opacity-[90%] border border-[#B35642] absolute bottom-0  w-full text-[15px] text-[#B35642] pb-2 pt-1 rounded-b-md": " bg-[#B35642] absolute bottom-0  w-full text-[12px] rounded-b-md"}>
                            <h3 className="px-2 pt-2">{e.eventType}</h3>
                            <h3 className="px-2 pt-1">{e.name}</h3>
                            {
                                currentDiv === index ? 
                                    <div className="text-center flex flex-col ">
                                        <p className="pt-1 text-start px-2">{e.description}</p>
                                        <button className="text-center mt-10 p-1 text-[#E2725B]  bg-white border rounded-b-md" type="button" id="Reservadevento" name="reservadeevento">Reserva de evento</button>
                                    </div>
                                        
                                    : <></>
                                }
                            </div>
                        </div>
                    )
                }): <div><h2>No se encontraron eventos..</h2></div>
             }
             </div>
             
        </div>
    )
};