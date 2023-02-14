import { Request, Response, NextFunction } from "express";
import { payloadType } from "./validateToken";
const jwt = require("jsonwebtoken");
const {User} = require("../database");

export const checkRoleAuth = (rols:string) => async (req: Request, res: Response, next: NextFunction) => {

   try {
     const token = req.header("auth-token");
     const tokenData = await  jwt.verify(token, process.env.TOKEN_SECRET) as  payloadType;
     const userData = await User.findByPk(tokenData.id, {
         attributes: {
             exclude: ['password']
         }
     });
     
     if(userData.privilege === rols){
         next();
     }
     else{
         res.status(409).send({error: 'Acceso denegado por permisos'})
     }
   } catch (error) {
     res.status(400).send(error);
   }
};