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
    const { name, email, entryDate, exitDate, payment, roomId, payAmount, reservedDays } = req.body;
    const reservation = await Reservation.create({
      name,
      email,
      entryDate,
      exitDate,
      payment,
      roomId,
      payAmount,
      reservedDays
    });
    await reservation.setRoom(roomId);
    res.status(200).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default route;
