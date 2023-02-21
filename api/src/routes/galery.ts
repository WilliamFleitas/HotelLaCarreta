import { Router, Request, Response } from "express";
import { checkRoleAuth } from "../libs/roleAuth";
import { TokenValidation } from "../libs/validateToken";
const route = Router();
const { Post } = require("../database");
const rolType: string = process.env.ROL_TYPE as string;

route.get("/", async (req: Request, res: Response) => {
    try {
      const { page = 1, size = 20 } = req.query;
      let options = {
        limit: size,
        offset: Number(page) * Number(size)
      }
      if(!req.query.page){
        const result = await Post.findAll({
          order: [['updatedAt', 'DESC']] });
        if (result.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(400).send("No se encontraron habitaciónes");
        }
      } else {
        const result = await Post.findAndCountAll({
          distinct: true,
          limit: options.offset,
          order: [['updatedAt', 'DESC']] });
        if (result.rows.length > 0) {
          res.status(200).send(result);
        } else {
          res.status(400).send("No se encontraron habitaciónes");
        }
      }
      
    } catch (error) {
      res.status(400).send(error)
    }
  });

  route.delete("/:id", async (req: Request, res: Response) => {
    const {id} = req.params;
  
    try {
      const result = await Post.findByPk(id);
      if(result){
        await result.destroy(id);
        res.status(200).send("Eliminado con exito");
      }else 
      {
        res.status(400).send("No se encontro la publicación")
      }
    } catch (error) {
      res.status(400).send(error);
    }
  
  });

route.post("/",TokenValidation, checkRoleAuth(rolType), async (req: Request, res: Response) => {
    try {
      const result = await Post.create(req.body);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });

export default route;
