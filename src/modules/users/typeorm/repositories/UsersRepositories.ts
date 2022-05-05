import { MysqlDataSource } from "@shared/typeorm";
import User from "../entities/User";

const UsersRepository  = MysqlDataSource.getRepository(User).extend({

    async findByEmail(email: string): Promise<User | null> 
    {
        return await this.findOne({
            where: {
                email
            }
        });

    },
    async findByName(name: string): Promise<User[] | null>
    {
        return this.createQueryBuilder("users")
            .where("users.name = :name", { name })
            .execute()
    },
    async findById(id: number): Promise<User | null>
    {
        return await this.findOne({
            where: {
                id
            }
        });

    },

})

export default UsersRepository;