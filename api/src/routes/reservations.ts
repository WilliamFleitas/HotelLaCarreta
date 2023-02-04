import { Router, Request, Response } from "express";
const route = Router();
const { Reservation} = require("../database");

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

route.post("/webhooknotify", async (req: Request, res: Response) => {
  try {
    const body = req;
    console.log(body);
    res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400)
  }
  
});

route.post("/", async (req: Request, res: Response) => {
  try {
    
    const { name,  checkIn, checkOut, totalPrice, roomId, reservedDays, adults, payment, childs, nightQuantity, dni  } = req.body;
    const reservation = await Reservation.create({
      name,
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
