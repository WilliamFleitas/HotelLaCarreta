import React from "react";
import { RoomsDetails } from "../../redux/slices/RoomSlice";
import {FaConciergeBell} from "react-icons/fa";
import { Link } from "react-router-dom";

interface CardProps {
    rooms: RoomsDetails;
}

export const RoomCard = ({rooms}:CardProps) => {
   
    return ( 
        <div key={rooms.id} className="flex flex-col text-center bg-[#B35642] h-full w-[300px] p-2 rounded-lg border-2 border-[#D3B616] hover:opacity-[90%] " draggable="false">

            <Link to={`/roomdetail/${rooms.id}`} draggable="false">

            <h2 className="bg-white m-2 h-[40px] p-2 rounded-lg text-[#B35642] text-[20px] border-2 border-[#D3B616]">{rooms.name}</h2>

            <div className="rounded-lg pt-4 " key={rooms.id}>
            <img key={rooms.id} className="rounded-lg h-[200px] object-fit border-2 border-[#D3B616]" src={rooms.images[0]} alt={`${rooms.images[0]}_image`}/>
            </div>
            
            <div className="pt-4 text-white" >
            <h3 className="text-[20px] pb-4">Precio por noche: {rooms.price}</h3>
            <p>{rooms.preDescription}</p>
            
            </div>
            <div className="flex  justify-center pt-5" >
            <h3 className="text-[#B35642] bg-white w-[100px] text-center rounded-lg border-2 border-[#D3B616]">Servicios</h3>
            </div>
            

           <div className="grid grid-cols-2  text-white pr-2" >
            
            {
             rooms.room_services.slice(0, 2).map((e) => { 
                return ( 
                    <div key={e} className="flex justify-start flex-col items-center pt-4">
                        <div className=" h-[150px] justify-start flex-col flex items-center">
                        <FaConciergeBell className="text-[30px]  text-black "/>
                        
                        <p className="">{e}</p>
                        </div>
                    </div>
                )
                
             })
            
            }
           </div>
           </Link>
        </div>
    )
};