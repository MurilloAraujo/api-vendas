import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import ForgotPasswordController from "../controllers/ForgetPasswordController";

const passwordRouter = Router();
const forgetController = new ForgotPasswordController();

passwordRouter.post(
    "/forget",
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required()
        }
    }),
    forgetController.create
);

export default passwordRouter;