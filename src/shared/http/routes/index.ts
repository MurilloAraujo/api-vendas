import productsRouter from "@modules/products/routes/products.routes";
import passwordRouter from "@modules/users/routes/password.routes";
import sessionRouter from "@modules/users/routes/session.route";
import userRoute from "@modules/users/routes/user.route";
import { Router } from "express";

const routes = Router();

routes.use("/products", productsRouter);
routes.use("/users", userRoute);
routes.use("/sessions", sessionRouter)
routes.use("/password", passwordRouter)


export default routes;