import { Router } from "express";
const routes = Router();
import rooms from "./rooms";
import reservations from "./reservations";
import facilitiesR from "./facilitiesRoute";
import galleryR from "./galery";
import userAuth from "./authRoute";

routes.use("/api/auth", userAuth);
routes.use("/rooms", rooms);
routes.use("/reservations", reservations);
routes.use("/gallery", galleryR);
routes.use("/facilities", facilitiesR);
export default routes;
