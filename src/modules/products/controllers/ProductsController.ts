import { Request, Response } from "express";
import CreateProductService from "../services/CreateProductService";
import DeleteProductService from "../services/DeleteProductService";
import ListProductService from "../services/ListProductService";
import ShowProductService from "../services/ShowProductService";
import UpdateProductService from "../services/UpdateProductService";

export default class ProductsController {

    public async show(request: Request, response: Response) {

        const listProducts = new ListProductService();
        const products = await listProducts.execute(null);
        response.status(200).json(products)
    }

    public async create(request: Request, response: Response): Promise<Response> {

        const { name, price, quantity } = request.body;        

        
        const createProduct = new CreateProductService();
        const product = await createProduct.execute({ name, price, quantity })

        return response.status(200).json({
            body: {
                status: 200,
                message: "criado com sucesso",
                create_at: new Date()
            },
            item_create: {
                product: product
            }
           
        })
    }

    public async showProduct(request: Request, response: Response): Promise<Response> {

        const idProduct = Number(request.params.id);


        const getProductId = new ShowProductService();
        const product = await getProductId.execute(idProduct);

        return response.status(200).json({ product })
    }


    public async update(request: Request, response: Response): Promise<Response> {

        const id = Number(request.params.id);
        const { name, price, quantity } = request.body

        const getProductId = new UpdateProductService();
        const product = await getProductId.execute({ id, name, price, quantity });

        return response.status(200).json({ product })
    }


    public async delete(request: Request, response: Response): Promise<Response> {

        const id = Number(request.params.id);

        const getProductId = new DeleteProductService();
        const product = await getProductId.execute(id);

        return response.status(200).json({ product })
    }

}