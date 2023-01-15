import { Router } from "express";
const routes = Router();
import rooms from "./rooms";
import reservations from "./reservations";
import facilitiesR from "./facilitiesRoute";
routes.use("/rooms", rooms);
routes.use("/reservations", reservations);
routes.use("/facilities", facilitiesR);
export default routes;
