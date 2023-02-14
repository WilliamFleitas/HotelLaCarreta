const {check } = require("express-validator");
import { Request, Response, NextFunction } from "express";
import { userType } from "../Typos";
const {validateResult} = require("./validatorHelpers/validateHelper");
const {User} = require("../database");


const createUserValidate = [
    check('username').exists().not().isEmpty().withMessage('Falta username'),
    check('email').exists().isEmail().not().isEmpty().withMessage('Falta email').custom((value: string) => {
    return  User.findOne({
        where: { email: value},
      }).then( (user: userType): any => {
        if (user) {
          return Promise.reject('E-mail already in use');
        }
      });
    }),
    check('password' , 'Minimo 8+ caracteres de longitud y contener por lo menos un numero').exists().not().isEmpty().withMessage('Falta password').not()
    .isIn(['123', 'password', 'god', 'asdasd'])
    .withMessage('No usar palabras comunes como contraseña')
    .isLength({ min: 8 })
    .matches(/\d/),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];

const signUserValidate = [
    check('email').exists().isEmail().not().isEmpty().withMessage('Ingrese un email').custom((value: string) => {
        return  User.findOne({
            where: { email: value},
          }).then( (user: userType): any => {
            if (!user) {
              return Promise.reject('Email incorrecto');
            }
          });
        }),
    check('password' ,).exists().not().isEmpty().withMessage('Ingrese password'),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    }
];
module.exports = { createUserValidate, signUserValidate };