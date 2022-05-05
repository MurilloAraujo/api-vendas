import AppError from "@shared/errors/AppError";
import { MysqlDataSource } from "@shared/typeorm"
import Product from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";



class ShowProductService {

    public async execute(idProduct: number): Promise<Product | null> 
    {
        const repositotyProduct = MysqlDataSource.getRepository(Product);
        const product = await ProductsRepository.findOne({ where: { id: idProduct } })

        if (!product) {
            throw new AppError("product not found", 400);
        }


        return product;
    }
}

export default ShowProductService;