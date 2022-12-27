import { Router, Request, Response } from "express";
const route = Router();
const { Room } = require("../database");

route.get("/", (_req: Request, res: Response) => {
  res.status(200).send("Hola");
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
