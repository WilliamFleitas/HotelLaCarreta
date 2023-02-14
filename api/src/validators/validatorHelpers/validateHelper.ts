const { validationResult } = require("express-validator");
import { Request, Response, NextFunction } from "express";

const validateResult = (req: Request, res: Response, next: NextFunction) => {

    try {
        validationResult(req).throw()
        return next()
    } catch (error: any) {
        res.status(403).send({errors: error.array()})
    }
}; 

module.exports = {validateResult};