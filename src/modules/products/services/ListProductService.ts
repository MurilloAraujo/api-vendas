import AppError from "@shared/errors/AppError";
import { MysqlDataSource } from "@shared/typeorm"
import Product from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";


class ListProductService {

    public async execute(limit: number): Promise<any> 
    {
        const repositotyProduct = MysqlDataSource.getRepository(Product);
        return await repositotyProduct.find()
    }
}

export default ListProductService;