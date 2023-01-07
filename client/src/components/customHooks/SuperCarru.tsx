import React, { useEffect, useState } from "react";

interface Props {
    file: Array<string>;
    className: string;
}

export const SuperCarru = (props: Props) => {
    

    const [actualImage, setActualImage] = useState(0);

    let myInterval: ReturnType<typeof setInterval> | undefined;
    
    const nextImg = () => {
        clearInterval(myInterval);
        setActualImage(actualImage === props.file.length - 1 ? 0 : actualImage + 1);
      };

      useEffect(() => {
        myInterval = setInterval(nextImg, 14000);
      }, [actualImage]);

    return (
            <div className="">
                {
                props.file?.map((image:string, index:number): any => {
                    return(
                        <div key={image}>
                            {actualImage === index && ( 
                                <div >
                                    
                                    <img className={props.className} src={image} key={index} alt={image}/>
                                </div>
                            )}
                        </div>
                    )
                    })
                }
            </div>
    )
}