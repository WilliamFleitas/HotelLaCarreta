import { Router, Request, Response } from "express";
const route = Router();
const { Reservation } = require("../database");

route.post("/", async (req: Request, res: Response) => {
  try {
    const { name, email, entryDate, exitDate, payment, RoomId } = req.body;
    const reservation = await Reservation.create({
      name,
      email,
      entryDate,
      exitDate,
      payment,
    });
    await reservation.setRoom(RoomId);
    res.status(200).send(reservation);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default route;
