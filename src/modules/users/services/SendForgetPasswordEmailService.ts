import { MysqlDataSource } from "@shared/typeorm"
import UsersRepository from "../typeorm/repositories/UsersRepositories";
import AppError from "@shared/errors/AppError";
import UsersTokenRepository from "../typeorm/repositories/UsersTokenRepositories";
import { log } from "console";


interface IRequest {
    email: string
}

class SendForgetPasswordEmailService {

    public async execute({ email }: IRequest): Promise<void> {

        const usersRepositories = MysqlDataSource.manager.withRepository(UsersRepository);
        const tokenRepository = MysqlDataSource.manager.withRepository(UsersTokenRepository);

        const user = await usersRepositories.findByEmail(email);

        if (!user) {
            throw new AppError("User email not found");
        }
        

        const generateToken = await tokenRepository.generate(user.id.toString());

    }
}

export default SendForgetPasswordEmailService;