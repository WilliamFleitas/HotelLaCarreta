import React from "react";
import useWindowSize from "../customHooks/useWindowSize";



export const Highlights = () => {

        
    const {width} = useWindowSize();


    return ( 
        <div className="overflow-x-hidden">
            {width < 768 ? 
            <div className="pt-10">
            <div className=" text-white text-[25px] pt-7 bg-[#B35642] h-full  w-screen text-center p-5 object-fit border-[1px] border-[#D3B616]">
            <h2>Aspectos destacados</h2>
            <div className="text-[15px] pt-5 space-y-5">
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quia dolorem, eius dignissimos quidem, magnam quae ut perspiciatis minima nobis pariatur, a obcaecati numquam molestiae saepe nihil sit natus quisquam hic.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur fugiat laboriosam beatae odio in consectetur, perferendis inventore rerum eligendi maiores eveniet ut cum deserunt blanditiis sequi expedita impedit, aspernatur delectus.</p>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur fugiat laboriosam beatae odio in consectetur, perferendis inventore rerum eligendi maiores eveniet ut cum deserunt blanditiis sequi expedita impedit, aspernatur delectus.</p>
            </div>
            
            </div>
        </div> 
        : 
        <div className="text-[#696969] text-center justify-center p-5 pt-24 lg:p-14 ">
             <h2 className="text-[35px] pt-8 pb-10 text-[#E2725B]">Aspectos destacados</h2>

             <div className="grid grid-cols-3 text-[20px] lg:gap-4">
             <p className="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium at dolorum quidem, non facilis aliquam blanditiis hic corrupti eum, dolorem eligendi esse enim. Aspernatur, fugiat neque? Dolorum facere eaque similique?</p>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium at dolorum quidem, non facilis aliquam blanditiis hic corrupti eum, dolorem eligendi esse enim. Aspernatur, fugiat neque? Dolorum facere eaque similique?</p>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium at dolorum quidem, non facilis aliquam blanditiis hic corrupti eum, dolorem eligendi esse enim. Aspernatur, fugiat neque? Dolorum facere eaque similique?</p>
             </div>
             
             
             
        </div>
            }
                 
        </div>
        
    )
}