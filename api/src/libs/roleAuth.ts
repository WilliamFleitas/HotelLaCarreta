import { Request, Response, NextFunction } from "express";
import { payloadType } from "./validateToken";
const jwt = require("jsonwebtoken");
const {User} = require("../database");

export const checkRoleAuth = (rols:string) => async (req: Request, res: Response, next: NextFunction) => {

   try {
     const token = req.header("auth-token");
     if(!token){
      res.status(404).send("Token invalido.");
     }
     console.log("checkrol",  token, req.headers, req.body);
     const tokenData = await  jwt.verify(token?.toString(), process.env.TOKEN_SECRET as string) as  payloadType;
     
     console.log("tokendata", tokenData)
     const userData = await User.findByPk(tokenData.id, {
         attributes: {
             exclude: ['password']
         }
     });
     
     if(userData.privilege === rols){
         next();
     }
     else{
      console.log("fallo verificacion", tokenData, userData)
         res.status(409).send({error: 'Acceso denegado por permisos'})
     }
   } catch (error) {
    console.log("errorcheckrol", error);
     res.status(400).send(error);
   }
};