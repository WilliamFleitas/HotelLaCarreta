import { Router, Request, Response } from "express";
const route = Router();
const { Reservation } = require("../database");

route.get("/", async (_req: Request, res: Response) => {
  const rooms = await Reservation.findAll();
  if (rooms) {
    res.status(200).send(rooms);
  } else {
    res.status(400).send("no se encontro nada");
  }
});

route.post("/", async (req: Request, res: Response) => {
  try {
    console.log("hola", req.body);
    const { name,  checkIn, checkOut, totalPrice, roomId, reservedDays, adults, payment, childs, nightQuantity, dni  } = req.body;
    const reservation = await Reservation.create({
      name,
      entryDate: checkIn,
      exitDate: checkOut,
      payAmount: totalPrice,
      roomId,
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
