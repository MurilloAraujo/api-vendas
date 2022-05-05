import { MysqlDataSource } from "@shared/typeorm"
import UsersRepository from "../typeorm/repositories/UsersRepositories";
import AppError from "@shared/errors/AppError";
import UsersTokenRepository from "../typeorm/repositories/UsersTokenRepositories";
import { isAfter, addHours } from "date-fns";
import { hash } from "bcryptjs";
import User from "../typeorm/entities/User";


interface IRequest {
    token: string,
    password: string
}

class ResetPasswordService {

    public async execute({ token, password }: IRequest): Promise<User | null> {

        const users = MysqlDataSource.manager.withRepository(UsersRepository)
        const tokenRepository = MysqlDataSource.manager.withRepository(UsersTokenRepository);

        const userToken = await tokenRepository.findByToken(token);

        if (!userToken) {
            throw new AppError("User token does not found"!);
        }

        const userFindBy = await users.findById(userToken.user_id);
        const tokenCreatedAt = userToken.created_at;
        const compareDate = addHours(tokenCreatedAt, 24);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError("Token expired!");
        }


        if (userFindBy) {
            userFindBy.password = await hash(password, 8);
            return await users.save(userFindBy);
        }

        return null;

    }
}

export default ResetPasswordService;