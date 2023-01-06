require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
import routes from "./routes/index";
const { sequelize } = require("./database");
const morgan = require("morgan");

const { BACKEND_PORT, CLIENT_URL } = process.env;

//creamos el servidor
const app = express();

//middlewares
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", CLIENT_URL); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(express.json()); // transforma la req.body a un objeto
app.use(morgan("dev"));
app.use("/", routes);
//Admitir llamados del front


sequelize
  .sync({ force: true })
  .then(() => {
    app.listen(BACKEND_PORT, () => {
      console.log("Database connected");
      console.log("Server running on ", BACKEND_PORT);
    });
  })
  .catch((error: any) => {
    console.log("No se pudo conectar a la DB ", error);
  });
