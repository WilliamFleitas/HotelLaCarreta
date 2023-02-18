import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken");

export interface payloadType { 
    id: string;
    iat: number;
    exp: number;
}
export const TokenValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("auth-token"); 
        console.log("tokenvalidate", token);
     if(!token) {
        res.status(401).send("Token invalido");
    }
     else{
     const payloadToken = await  jwt.verify(token, process.env.TOKEN_SECRET) as  payloadType;
        console.log("palodtoken", payloadToken);
        req.userId= payloadToken.id;

        next();

     } 
    } catch (error: any) {
        console.log("tokenasd", error);
        res.status(400).send(error);
    }
     
     
};