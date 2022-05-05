import { MysqlDataSource } from "@shared/typeorm"
import Product from "../../../products/typeorm/entities/Product"

export const ProductsRepository = MysqlDataSource.getRepository(Product).extend({
    findByName(name: string): Promise<Product[]>
     {
        return this.createQueryBuilder("products")
        .where("products.name = :name", { name })
        .execute()
    }
})