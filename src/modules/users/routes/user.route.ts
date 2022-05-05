import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import UserController from "../controllers/UserController";
import isAuthenticade from "../../../shared/http/middlewares/isAuthenticade";
import multer from "multer";
import upload from "@config/upload";
import UserAvatarController from "../controllers/UserAvatarController";

const userRoute = Router();
const userController = new UserController();
const avatarController = new UserAvatarController();

const uploadApply = multer(upload);

userRoute.get("/", isAuthenticade,  userController.index);

userRoute.post(

    "/create",
    
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required(),
            password: Joi.string().required(),
        }
    }),

    userController.create
)

userRoute.patch(
    "/avatar",
    isAuthenticade,
    uploadApply.single("avatar"),
    avatarController.update
);


export default userRoute;