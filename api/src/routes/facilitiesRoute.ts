const { Facilitie } = require("../database");
import { Router, Request, Response } from "express";
import { checkRoleAuth } from "../libs/roleAuth";
import { TokenValidation } from "../libs/validateToken";
const rolType: string = process.env.ROL_TYPE as string;

const route = Router();

route.get("/", async (_req: Request, res: Response) => {
    try {
      const result = await Facilitie.findAll();
    if (result.length > 0) {
      res.status(200).send(result);
    } else {
      res.status(400).send("No se encontraron instalaciones");
    }
    } catch (error) {
      res.status(400).send(error)
    }
  });

route.delete("/:id", async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const result = await Facilitie.findByPk(id);
    if(result){
      await result.destroy(id);
      res.status(200).send("Eliminado con exito");
    }else 
    {
      res.status(400).send("No se encontro la instalación")
    }
  } catch (error) {
    res.status(400).send(error);
  }

});

route.post("/", TokenValidation, checkRoleAuth(rolType), async (req: Request, res: Response) => {
    try { console.log(req.header);
      console.log(req.body);
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