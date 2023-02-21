import React from "react";
import reviewsPhoto from "../../assets/reseñasphoto.png";

export const ReviewsCompo = () => {

    return (

        <div className=" text-black px-5  text-center justify-center items-center " >
            <div ><h2 draggable="false" className="dragableF text-[#E2725B] text-[35px] py-10" >Reseñas</h2></div>
        
        <div className=""  >
        <img draggable="false" src={reviewsPhoto} alt={reviewsPhoto} className="dragableF rounded-xl  border border-white shadow-md shadow-black md:h-[550px] "/>
        
          <div draggable="false" className="z-50  text-[#E2725B] p-5 mt-1 relative bottom-20" >
          <a draggable="false" target="_blank" href="https://www.google.com/travel/hotels/la%20posada%20rural%20la%20carreta/entity/CgsIr5iBz8_C3Pf7ARAB/reviews?q=la%20posada%20rural%20la%20carreta&g2lb=2502548%2C2503771%2C2503781%2C4258168%2C4270442%2C4284970%2C4291517%2C4306835%2C4429192%2C4515404%2C4570332%2C4597339%2C4731329%2C4757164%2C4778035%2C4814050%2C4861688%2C4864715%2C4874190%2C4886082%2C4886480%2C4893075%2C4899568%2C4899569%2C4902277%2C4906019%2C4920132%2C4926165%2C4926489%2C4936396%2C4942347%2C4946428%2C4950242%2C4950357%2C4953836&hl=es-PY&gl=py&ssta=1&rp=EK-Ygc_Pwtz3-wEQr5iBz8_C3Pf7ATgCQABIAcABApoCAggA&ictx=1&sa=X&ved=0CAAQ5JsGahcKEwiwyMX485v9AhUAAAAAHQAAAAAQAw&utm_campaign=sharing&utm_medium=link&utm_source=htls&ts=CAESABpJCisSJzIlMHg5NDVhMmY3NzE5ZjVhNmJkOjB4ZmJlZjcyMTRmOWUwNGMyZhoAEhoSFAoHCOcPEAMYBhIHCOcPEAMYBxgBMgIQACoECgAaAA" >          
        <button draggable="false" className=" bg-white rounded-lg p-2 text-[#E2725B] hover:bg-[#9e9e9e] " >Ver todas las reseñas</button>
        </a>
        </div>
        
        
      </div>
      </div>
    )
};