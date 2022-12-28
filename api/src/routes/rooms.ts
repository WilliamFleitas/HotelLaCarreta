import { Router, Request, Response } from "express";
const {Reservation}= require("../database")
const route = Router();
const { Room } = require("../database");

route.get("/", async (_req: Request, res: Response) => {
    const rooms = await Room.findAll({include: Reservation})
    if(rooms){
      res.status(200).send(rooms)
    }else {
      res.status(400).send("no se encontro nada")
    }
});

route.post("/", async (req: Request, res: Response) => {
  try {
    const { name, description, images, price } = req.body;
    const room = await Room.create({
      name,
      description,
      images,
      price,
    });
    res.status(200).send(room);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default route;
