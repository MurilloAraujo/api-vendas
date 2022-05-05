import AppError from "@shared/errors/AppError";
import { MysqlDataSource } from "@shared/typeorm"
import { DeleteResult, ObjectID } from "typeorm";
import Product from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";



class DeleteProductService {

    public async execute(idProduct: number): Promise<DeleteResult> 
    {
        const repositotyProduct = MysqlDataSource.getRepository(Product);
        const product = await ProductsRepository.findOne({ where: { id: idProduct } })

        if (!product) {
            throw new AppError("product not found", 400);
        }

        const deleteProduct = await repositotyProduct.delete(product.id);


        if(!deleteProduct){
            throw new AppError("Error delete product ", 400);
        }

        return deleteProduct;
    }
}

export default DeleteProductService;