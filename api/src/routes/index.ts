import { Router } from "express";
const routes = Router();
import rooms from "./rooms";
import reservations from "./reservations";

routes.use("/rooms", rooms);
routes.use("/reservations", reservations);

export default routes;
