import AppError from "@shared/errors/AppError";
import { MysqlDataSource } from "@shared/typeorm"
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepositories";

class ListUsersService {

    public async execute(): Promise<User[] | null> 
    {
        const repositotyUser = MysqlDataSource.getRepository(User);
        return await repositotyUser.find()
    }
}

export default ListUsersService;