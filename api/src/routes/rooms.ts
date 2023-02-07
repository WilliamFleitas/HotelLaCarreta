import { Router, Request, Response } from "express";
const { Reservation } = require("../database");
const route = Router();
const { Room } = require("../database");

route.get("/", async (_req: Request, res: Response) => {
  try {
    const rooms = await Room.findAll({ include: Reservation });
  if (rooms.length > 0) {
    res.status(200).send(rooms);
  } else {
    res.status(200).send("No se encontraron habitaciónes");
  }
  } catch (error) {
    res.status(400).send(error)
  }
});

route.get("/roombyprices", async (_req: Request, res: Response) => {
  try {
    const rooms = await Room.findAll({ order: [
      ['price', 'DESC']
    ]});
  if (rooms.length > 0) {
    res.status(200).send(rooms);
  } else {
    res.status(200).send("No se encontraron habitaciónes");
  }
  } catch (error) {
    res.status(400).send(error)
  }
});

route.get("/:id", async (req: Request, res: Response) => {

  try {
    const { id } = req.params;
    if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(id)){
        res.status(400).send("Ingrese un ID valido");
    }
    const result = await Room.findByPk(id, { include: Reservation });
    if(!result){
      res.status(400).send("No se encontro la habitación")
    }else{
      res.status(200).send(result);
    }
  } catch (error) {
    console.log(error);
  }
});

route.put("/:id", async (req: Request, res: Response) => {
  try {
    const room = await Room.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    console.log(room);
    res.status(200).send("Habitacion editada correctamente");
  } catch (error) {
    console.log(error);
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


// ##enpoint que postea las habitaciones
route.post("/", async (req: Request, res: Response) => {
  try {
    if(!req.body.name || !req.body.description || !req.body.preDescription || !req.body.images || !req.body.price || !req.body.capacity){
      res.status(400).send("Faltan datos para crear la habitación")
    }
    const room = await Room.create(req.body);
    res.status(200).send(room);
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

export default route;
