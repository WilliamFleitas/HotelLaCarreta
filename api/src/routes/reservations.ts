import { Router, Request, Response } from "express";
import { deleteDebtAdams, deleteReservation, getDebtAdams, payReservation, revertPayReservation} from "./paymentControllers/paymentController";
import { revertTransactionAdams } from "./paymentControllers/paymentController";
const {transporter, revertReservationEmail} = require("../transport/index");
const route = Router();
const { Reservation} = require("../database");
import dayjs from "dayjs";

route.get("/", async (_req: Request, res: Response) => {
  const rooms = await Reservation.findAll();
  if (rooms) {
    res.status(200).send(rooms);
  } else {
    res.status(400).send("no se encontro nada");
  }
});


route.get("/bookingid/:id", async (req: Request, res: Response) => {
  try {
    const {id} = req.params;
    if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)){
      res.status(400).send("Ingrese un ID valido");
  } 
      
      const result = await Reservation.findByPk(id);
      
      if(!result){
        res.status(400).send("No se encontro la habitación")
      }else{
        res.status(200).send(result);
      }
    
  } catch (error) {
    console.log(error);
    res.status(400).send("Algo fallo por favor intente más tarde");
  }
  
});

route.get("/adams/debtbyid/:id", async (req: Request, res: Response) => {
  const {id} = req.params;
  
    const result = await getDebtAdams(id);

    const debtAdams = result?.data? result?.data : result.response?.data;

    console.log("resultasdas1", result?.data? result?.data : result.response?.data);

    const statusDebt = debtAdams.meta.status;

    console.log("resultasdas2", statusDebt);
    if(statusDebt === "error"){
      res.status(400).send(debtAdams.meta.description);
    }
    else {
      res.status(200).send(debtAdams);
    }
    
});

route.post("/webhooknotify",   async (req: Request, res: Response) => {
  try {
    const body = req;
    const id = body.body.debt.docId;
    const labelDebt = body.body.debt.label;
    const statusPay = body.body.debt.payStatus.status;
    const statusObj = body.body.debt.objStatus.status; 
    console.log("vari", statusPay, statusObj);
    //si la notify es igual a paid y el paid value es igual al paid amount se reserva la habitacion, si es solo una notify de pago partial no hace nada y notifica 200, 
    if(statusPay === "paid" && statusObj === "success"){

      try {
        if(Number(body.body.debt.amount.value) === Number(body.body.debt.amount.paid)){
          const result = await payReservation(id, labelDebt);
          console.log("resultdelresult", result);
          console.log("es paid y success", body.body);
        }

          res.status(200).send("llego");
      } catch (error) {
       const debResult = await getDebtAdams(id);
       const emailUser = debResult?.data?.debt?.target.label
       console.log("holandass", debResult.data);
       const revertDebt = await revertTransactionAdams(debResult.data.debt.refs.txList[0].txId);
       console.log(revertDebt.data);
       transporter.sendMail(
        revertReservationEmail(emailUser),
          (err: any, info: any) =>
            err ? console.log(err) : console.log("se envio elcorreo de reverción", info.response)
        );
        console.log("trycatchpayerror", error);
        res.status(200);
      }
    }

    else if(statusPay === "pending" && statusObj === "active"){
      const debtEnd = body.body.debt.validPeriod.end;
      const actualDate = dayjs().format("YYYY-MM-DDTHH:mm:ss");

      if(debtEnd < actualDate){
        const deletePayReservation = await deleteReservation(id);
        console.log("fecha de la deuda pasada eliminar",deletePayReservation);
        res.status(200)
        
      }
      else {
        const revertReervation = await revertPayReservation(id);
        console.log("se revirtio una deuda", revertReervation);
        res.status(200).send("llego");
      }
      
    }
    else if(statusPay === "pending" && statusObj === "expired"){
      console.log("el pago expiro, eliminar la reserva", body.body);
      
       await deleteReservation(id);
      const debResult = await getDebtAdams(id);
       const emailUser = debResult?.data?.debt?.target.label
       console.log("holandass", debResult.data);
       if(debResult.data?.debt?.refs !== null){
        const revertDebt = await revertTransactionAdams(debResult.data.debt.refs.txList[0].txId);
        console.log(revertDebt.data);
        transporter.sendMail(
         revertReservationEmail(emailUser),
           (err: any, info: any) =>
             err ? console.log(err) : console.log("se envio elcorreo de reverción", info.response)
         );
       }
       
        
      await deleteDebtAdams(id);
      res.status(200)
    }
    else{
      console.log("entro al else", body.body, body.body.debt.payStatus.status);
      res.status(200).send("llego");
    }
    
  } catch (error) {
    console.log(error);
    res.status(200)
  }
  
});




route.post("/", async (req: Request, res: Response) => {
  try {
    
    const { name, email,  checkIn, checkOut, totalPrice, roomId, reservedDays, adults, payment, childs, nightQuantity, dni  } = req.body;
    const reservation = await Reservation.create({
      name,
      email,
      entryDate: checkIn,
      exitDate: checkOut,
      payAmount: totalPrice,
      payment,
      reservedDays,
      adults, 
      childs, 
      nightQuantity,
      dni
    });

    await reservation.setRoom(roomId);
    res.status(200).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default route;
