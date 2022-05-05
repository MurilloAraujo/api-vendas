import AppError from "@shared/errors/AppError";
import { MysqlDataSource } from "@shared/typeorm"
import Product from "../typeorm/entities/Product";
import { ProductsRepository } from "../typeorm/repositories/ProductsRepository";

interface IRequest {
    id: number,
    name: string,
    price: number,
    quantity: number
}

class UpdateProductService {

    public async execute({ id, name, price, quantity }: IRequest): Promise<Product> 
    {
        const repositoryProduct = MysqlDataSource.getRepository(Product);
        const product = await ProductsRepository.findOne({ where: { id } })
        const productExistis = await ProductsRepository.findByName(name)        

        if (!product) {
            throw new AppError("product not found", 400);
        }
        
        if (productExistis.length) {
            throw new AppError("There is already one  product with this name", 400)
        }

        product.name = name;
        product.price = price;
        product.quantity = quantity;

        return await ProductsRepository.save(product);

    }
}

export default UpdateProductService;