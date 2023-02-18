import { Router, Request, Response } from "express";
import { checkRoleAuth } from "../libs/roleAuth";
import { TokenValidation } from "../libs/validateToken";
import { profile, signIn, signUp } from "./authcontrollers/authControllers";
const { createUserValidate, signUserValidate } = require("../validators/userValidator")
const jwt = require("jsonwebtoken");
const rolType: string = process.env.ROL_TYPE as string;
const route = Router();



route.post("/signup", createUserValidate, async (req: Request, res: Response) => {
    const { body } = req;
    
    try {
        const result = await signUp(body);
        const id = result.id.toString();
        const username = result.username;
        const userForToken = {id, username};
        const token: string =  jwt.sign(userForToken, process.env.TOKEN_SECRET );
          

        res.status(200).header("auth-token", token).send(result);
    } catch (error: any) {
        res.status(400).send(error.message);
    }

});

route.post("/signin", signUserValidate, async (req: Request, res: Response) => {
 const { body } = req;
 

    try {
        
        const result = await signIn(body);
        if(!result.objUser.id || !result.token){
            res.status(400).send("Email o contraseña incorrecta")
        }else{
            
            res.status(200).header("auth-token", result.token).send({data: result.objUser, token: result.token});
        }
        
    } catch (error: any) {
       
        res.status(400).send(error.message);
    }

});

route.get("/profile", TokenValidation, checkRoleAuth(rolType), async (req: Request, res: Response) => {

    
    try {
        
        const result = await profile(req.userId);
        if(!result){
            res.status(400).send("No se encontro el usuario")
        }
        else{
        res.status(200).send(result);
    }
    } catch (error: any) {
        res.status(400).send(error);
    }
});

export default route;