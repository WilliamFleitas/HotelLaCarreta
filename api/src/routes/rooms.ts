import { Router, Request, Response } from "express";
const { Reservation } = require("../database");
const route = Router();
const { Room } = require("../database");

route.get("/", async (_req: Request, res: Response) => {
  const rooms = await Room.findAll({ include: Reservation });
  if (rooms) {
    res.status(200).send(rooms);
  } else {
    res.status(400).send("no se encontro nada");
  }
});

route.put("/:id", async (req: Request, res: Response) => {
  try {
    await Room.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).send("Habitacion editada correctamente");
  } catch (error) {
    console.error(error);
    res.status(400).send("No se ha podido editar la habitacion");
  }
});

route.put("/toggle/:id", async (req: Request, res: Response) => {
  // Endpoint para activar y desactivar una habitacion, con el solo hecho de llamarla; si la habitacion esta activada la desactiva y viceversa
  try {
    const room = await Room.findByPk(req.params.id);
    await Room.update(
      { enabled: !room.enabled },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).send("Habitacion editada correctamente");
  } catch (error) {
    console.error(error);
    res.status(400).send("No se ha podido editar la habitacion");
  }
});

route.post("/", async (req: Request, res: Response) => {
  try {
    const room = await Room.create(req.body);
    res.status(200).send(room);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default route;
