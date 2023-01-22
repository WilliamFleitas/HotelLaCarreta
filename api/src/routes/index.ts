import { Router } from "express";
const routes = Router();
import rooms from "./rooms";
import reservations from "./reservations";
import facilitiesR from "./facilitiesRoute";
import galleryR from "./galery";

routes.use("/rooms", rooms);
routes.use("/reservations", reservations);
routes.use("/gallery", galleryR);
routes.use("/facilities", facilitiesR);
export default routes;
