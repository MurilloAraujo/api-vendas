import { MysqlDataSource } from "@shared/typeorm";
import UserToken from "../entities/UserToken";

const UsersTokenRepository = MysqlDataSource.getRepository(UserToken).extend({

    async findByToken(token: string): Promise<UserToken | null>
    {
        return await this.findOne({
            where: {
                token
            }
        });

    },
    async findByTokenUnique(token: string): Promise<UserToken[]> 
    {
        return this.createQueryBuilder("users_tokens")
            .where("users_tokens.token = :token", { token })
            .execute()
    },
    async findById(id: number): Promise<UserToken | null> 
    {
        return await this.findOne({
            where: {
                id
            }
        });

    },
    async generate(user_id: string): Promise<UserToken | null> 
    {    

        const token = MysqlDataSource.manager.withRepository(UsersTokenRepository);

        const tokenSave = token.create({ user_id })

        return await token.save(tokenSave);

    
    }

})

export default UsersTokenRepository;