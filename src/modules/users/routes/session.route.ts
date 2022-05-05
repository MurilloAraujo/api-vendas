import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionController from "../controllers/SessionController";

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.post("/", sessionController.create)

export default sessionRouter;