const { Reservation } = require("../../database");
const apiKey: string = process.env.ADAMS_APIKEY as string;
const apiUrl: string = process.env.ADAMSPAY_URL as string;
const axios = require("axios");
console.log(apiKey);
console.log(apiUrl);

export const payReservation = async (id: string) => {
    
    try {
        
        const response = await Reservation.findByPk(id);
        console.log("asdas", response);
        if(response){
            console.log("idpay", id);
            const result = await Reservation.update({payment: "complete"}, {
                where: {
                  id: id,
                },
              });
              console.log("resultpay", result);
              return "Reserva habilitada";
        }
        else {
            throw new Error("No se encontro el id");
        }
    } catch (error) {
        console.log("resultpayerr", error);
        throw new Error(`${error} no se pudo habilitar la reserva `); 
    }
};
//lista una deuda
export const getDebtAdams =  async (id: string) => {
    
        const debtResult = await axios.get(`${apiUrl}/api/v1/debts/${id}`, { headers: {
              'apikey': apiKey,
            }}).then((data: any) => { return data}).catch((e: any) => {return e});
        
          return debtResult;
    
  };
  
//revierte una deuda
export const revertDebtAdams =  async (id: string) => {
  const debtResult = await  axios.delete(`${apiUrl}/api/v1/tx/${id}`, { headers: {
        'apikey': apiKey,
      }});
    return debtResult;
};



export const revertPayReservation = async (id: string) => {

    try {
        console.log("idpay", id);
        const result = await Reservation.update({payment: "none"}, {
            where: {
              id: id,
            },
          });
          console.log("resultpay", result);
          return "Reserva deshabilitada";
    } catch (error) {
        console.log("resultpayerr", error);
        return `${error} no se pudo deshabilitar la reserva `; 
    }
};

export const deleteReservation = async (id: string) => {

    try {
        const response = await Reservation.findByPk(id);
        console.log("asdas", response);
        if(response){
            const deleteres = await response.destroy(id);
       console.log("eliminado", deleteres);
        return `Se elimino la reserva`;
        }
       else{
        return "no se encontro la reserva con ese id"
       }
     } catch (error) {
        console.log(error);
      return `${error} no se pudo eliminar la reserva `;
     }

};