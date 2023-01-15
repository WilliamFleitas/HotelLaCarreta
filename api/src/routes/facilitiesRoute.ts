const { Facilitie } = require("../database");
import { Router, Request, Response } from "express";


const route = Router();

route.get("/", async (_req: Request, res: Response) => {
    try {
      const result = await Facilitie.findAll();
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(400).send("No se encontraron habitaciones");
    }
    } catch (error) {
      res.status(400).send(error)
    }
  });

route.post("/", async (req: Request, res: Response) => {
    try {
      const result = await Facilitie.create(req.body);
      if(result.length < 0){
        res.status(400).send("No se pudo crear la instalación")
      }
      else{
        res.status(200).send(result);
      }
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });


export default route;