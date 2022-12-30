import React from "react";
import imgCarreta from "../../assets/2021-06-04.jpg"

export const Contenido = ()=>{
    return (
        <div className="mt-10 flex flex-col items-center text-[#B35642]">
                <h2 className="p-2 text-5xl text-center">Sobre Nosotros</h2>
                <p className="p-4 text-justify mb-4 w-7/12 justify-center">Luego de más de 30 años de vivir en Argentina decidimos apostar a nuestro país. Posada
                rural La carreta empezó como un proyecto familiar en nuestra casa de campo ubicada en nuestro pueblo natal en la compañía de San Juan Potrero, Misiones. En marzo de 2019 luego de un intenso trabajo pasamos a formar parte de la Red de Posadas Turísticas del Paraguay de la SENATUR. A partir de ahí comenzamos a dar nuestros primeros pasos con la convicción de seguir creciendo y consolidarnos en el rubro.
                Nuestra mision es brindar una experiencia de calidad y de manera eficiente, un oasis para nuestros huéspedes con la mezcla perfecta de naturaleza y confort.</p>
            <div className="m-0">
                <img className="m-0" src={imgCarreta} alt="La_carreta" />
            </div>
        </div>
    )
}