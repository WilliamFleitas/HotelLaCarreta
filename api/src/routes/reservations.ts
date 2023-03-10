import { Router, Request, Response } from "express";
import { deleteDebtAdams, deleteReservation, getDebtAdams, payReservation, revertPayReservation} from "./paymentControllers/paymentController";
import { revertTransactionAdams } from "./paymentControllers/paymentController";
const {transporter, revertReservationEmail} = require("../transport/index");
const route = Router();
const { Reservation} = require("../database");
const { emailContactToAdmin } = require("../transport/index");
const {Op} = require("sequelize");
import dayjs from "dayjs";

route.get("/", async (_req: Request, res: Response) => {
  const rooms = await Reservation.findAll();
  if (rooms) {
    res.status(200).send(rooms);
  } else {
    res.status(400).send("no se encontro nada");
  }
});

route.get("/admin/filteredres", async (_req: Request, res: Response) => {
  const result = await Reservation.findAll(
    { where: {
      entryDate: {
        [Op.gte]: dayjs()
      }
    },
      order: [ ['entryDate', 'ASC']]
    }
  );
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(400).send("no se encontro nada");
  }
});

route.get("/bookingid/:id", async (req: Request, res: Response) => {
  const {id} = req.params;
  try {
    
    if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)){
      res.status(400).send("Ingrese un ID valido");
      return;
  } 
      if(id !== null){
        const result = await Reservation.findByPk(id);
        if(!result){
          res.status(400).send("No se encontro la reserva")
        }else{
          res.status(200).send(result);
        }
      }  
      
      else {
        res.status(400).send("ID INVALIDO")
      }
  } catch (error) {
    res.status(400).send("Algo fallo por favor intente más tarde");
  }
  
});

route.get("/adams/debtbyid/:id", async (req: Request, res: Response) => {
  const {id} = req.params;
  
    const result = await getDebtAdams(id);

    const debtAdams = result?.data? result?.data : result.response?.data;


    const statusDebt = debtAdams.meta.status;

    if(statusDebt === "error"){
      res.status(400).send(debtAdams.meta.description);
    }
    else {
      res.status(200).send(debtAdams);
    }
    
});

route.post("/emailcontact", async (req: Request, res: Response) => {

  const body = req.body;

  
   transporter.sendMail(
    emailContactToAdmin(body),
      (err: any, info: any) =>
        err ? res.status(400).send(err) : res.status(200).send(`Se envio el correo de contactos con la administración  , ${info.response}`)
    );

});

route.post("/webhooknotify",   async (req: Request, res: Response) => {
  try {
    const body = req;
    const id = body.body.debt.docId;
    const labelDebt = body.body.debt.label;
    const statusPay = body.body.debt.payStatus.status;
    const statusObj = body.body.debt.objStatus.status; 
    
    if(statusPay === "paid" && statusObj === "success"){

      try {
        if(Number(body.body.debt.amount.value) === Number(body.body.debt.amount.paid)){
           await payReservation(id, labelDebt);
        }

          res.status(200).send("llego");
      } catch (error) {
       const debResult = await getDebtAdams(id);
       const emailUser = debResult?.data?.debt?.target.label
       await revertTransactionAdams(debResult.data.debt.refs.txList[0].txId);
       transporter.sendMail(
        revertReservationEmail(emailUser),
          (err: any, info: any) =>
            err ? console.log(err) : console.log("se envio elcorreo de reverción", info.response)
        );
        res.status(200);
      }
    }

    else if(statusPay === "pending" && statusObj === "active"){
      const debtEnd = body.body.debt.validPeriod.end;
      const actualDate = dayjs().format("YYYY-MM-DDTHH:mm:ss");

      if(debtEnd < actualDate){
         await deleteReservation(id);
        res.status(200)
        
      }
      else {
         await revertPayReservation(id);
        res.status(200).send("llego");
      }
      
    }
    else if(statusPay === "pending" && statusObj === "expired"){
      
       await deleteReservation(id);
      const debResult = await getDebtAdams(id);
       const emailUser = debResult?.data?.debt?.target.label
       if(debResult.data?.debt?.refs !== null){
         await revertTransactionAdams(debResult.data.debt.refs.txList[0].txId);
        
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
      res.status(200).send("llego");
    }
    
  } catch (error) {
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
