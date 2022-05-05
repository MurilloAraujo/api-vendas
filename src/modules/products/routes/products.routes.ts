import { Router } from "express";
import ProductsController from "../controllers/ProductsController";
import { celebrate, Joi, Segments } from "celebrate";

const productsRouter = Router();
const product = new ProductsController();

productsRouter.get("/", product.show)

productsRouter.get(
    "/show/:id",
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().required()
        }
    }),
    product.showProduct
);

productsRouter.post("/create", product.create);
productsRouter.put("/update/:id", product.update);
productsRouter.put("/delete/:id", product.delete);

export default productsRouter;