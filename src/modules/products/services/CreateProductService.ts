import AppError from "@shared/errors/AppError";
import { MysqlDataSource } from "@shared/typeorm"
import Product from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    name: any,
    price: number,
    quantity: number
}

class CreateProductService {

    public async execute({ name, price, quantity }: IRequest): Promise<Product | null>
    {

        const repositotyProduct = MysqlDataSource.manager.withRepository(ProductsRepository);
        const productExistis = await ProductsRepository.findByName(name)

        if (productExistis.length) {
            throw new AppError("There is already one  product with this name", 400)
        }

        const productSave = repositotyProduct.create({ name, price, quantity })

        return await repositotyProduct.save(productSave);

        

    }
}

export default CreateProductService;