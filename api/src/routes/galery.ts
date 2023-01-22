import { Router, Request, Response } from "express";
const route = Router();
const { Post } = require("../database");


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
          console.log(result);
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

route.post("/", async (req: Request, res: Response) => {
    try {
      const result = await Post.create(req.body);
      res.status(200).send(result);
    } catch (error) {
      console.error(error);
      res.status(400).send(error);
    }
  });

export default route;
