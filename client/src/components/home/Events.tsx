import React, { useState } from "react";
import { Link } from "react-router-dom";
import { boolean } from "zod";
import useWindowSize from "../customHooks/useWindowSize";
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
            description: "Contamos con una zona de reuniones. Si querés organizar una reunión personal o de alguna organización podés agendarlo con nosotros!",
            image: "https://firebasestorage.googleapis.com/v0/b/lacarretaposada-e7d7b.appspot.com/o/events%2Freunion.png?alt=media&token=d480641f-3a24-4e57-8dbf-860e648f8c0e",
        },
        {
            name: "Cumpleaños",
            eventType: "Evento privado",
            description: "Contamos con las mejores instalaciones para recibir a tus invitados!",
            image: "https://firebasestorage.googleapis.com/v0/b/lacarretaposada-e7d7b.appspot.com/o/events%2Fcumple.png?alt=media&token=b2bc4acb-450b-4037-a679-1a406f953429",
        },
        {
            name: "Intercambio",
            eventType: "Evento publico",
            description: "Sí te gusta la vivencia del campo ofrecemos te dejamos unirte a nosotros en el trabajo y el alojamiento te sale gratis!",
            image: "https://firebasestorage.googleapis.com/v0/b/lacarretaposada-e7d7b.appspot.com/o/events%2Fintercamb.png?alt=media&token=72f970d9-81b9-42e4-bf1a-242ca7d1f2e3",
        },
        {
            name: "Casamientos",
            eventType: "Evento privado",
            description: "Invita tantas personas como quieras, ofrecemos un hermoso lugar con amplias instalaciones!",
            image: "https://firebasestorage.googleapis.com/v0/b/lacarretaposada-e7d7b.appspot.com/o/events%2Ffiestas.png?alt=media&token=078aeddd-b6c6-45cc-845c-b8ff7bde5462",
        }
    ];
    const {width} = useWindowSize();

    const [switchI, setSwitchI] = useState(false);
    const [currentDiv, setCurrentDiv] = useState<number | undefined>(0);

    const handleSwitch = (index: number | undefined) => {
        if(width >= 768){
            if(switchI === false){
                setCurrentDiv(index);
                setSwitchI(true);
            } 
            if(switchI === true){
                setCurrentDiv(undefined);
                setSwitchI(false);
                
            }
        }
        else{
            return ;
        }
    };

    return (
        <div className=" text-white md:lg:p-8 md:p-5 overflow-x-hidden" >
            <h2 className="text-[25px] pt-14 pb-4 md:text-[35px] md:pt-20 md:pb-10 text-[#E2725B] text-center" data-aos="fade-up" data-aos-duration="2000">También podes reservar eventos!</h2>
            <div className="pt-5 grid grid-cols-2 md:grid md:grid-cols-4 p-2 gap-x-2 " data-aos="fade-up" data-aos-duration="2000" >
             {
                eventsObject.length > 0 ? eventsObject.map((e:eventsObjects, index: number) => {
                    return (
                        <div className="shadow-md mt-5 md:mt-0  shadow-[#B35642] relative border border-[#B35642] rounded-md"    key={e.name}>
                            <img className="shadow-md shadow-black md:h-[550px] md:w-screen object-cover rounded-md"  src={e.image} alt={e.image}/>
                        
                          
                          <div  className={currentDiv !== index ? " bg-white bg-opacity-[90%] border  absolute bottom-0 p-2 w-full md:text-[15px] text-[#E2725B] md:pb-2 pt-1 rounded-b-md ": " bg-[#B35642] p-2 absolute bottom-0 border-t-2  border-[#878382]  md:w-full md:text-[18px] rounded-b-md xl:text-[18px]"}  >
                            <div className="flex flex-row">
                            <div onClick={() => handleSwitch(index)} className="md:h-full md:w-screen md:hover:opacity-[80%] ">
                            <h3 className="md:px-2 md:pt-2">{e.eventType}</h3>
                            <h3 className="md:px-2 md:pt-1">{e.name}</h3>
                            </div>
                            
                            </div>
                            
                            {
                                currentDiv === index && width >= 768 ? 
                                    <div className=" text-center md:flex md:flex-col " >
                                        <p className="pt-1 text-start md:px-2" onClick={() => handleSwitch(index)}>{e.description}</p>
                                        
                                        <button className="text-center md:mt-10 p-1 text-[#E2725B] hover:bg-opacity-[80%] bg-white border-t-2 border-[#83635d] rounded-b-md" type="button" id="Reservadevento" name="reservadeevento"><a href="#footer">Reserva de evento</a></button>
                                        
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