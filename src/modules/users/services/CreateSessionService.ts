import AppError from "@shared/errors/AppError";
import { MysqlDataSource } from "@shared/typeorm"
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";

interface IRequest {
    email: string,
    password: string
}

interface IResponse {
    user: User;
    token: string
}

class CreateSessionService {

    public async execute({ email, password }: IRequest): Promise<IResponse> {

        const UsersRepositories = MysqlDataSource.manager.withRepository(UsersRepository);
        const user = await UsersRepositories.findByEmail(email);

        if (!user) {
            throw new AppError("Incorret email/password combinatio", 401);
        }

        const passwordConfirmed = await compare(password, user.password)

        if (!passwordConfirmed) {
            throw new AppError("Incorret email/password combination", 401);
        }
        

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id.toString(),
            expiresIn: authConfig.jwt.expiresIn
        });

        return { user, token };

    }
}

export default CreateSessionService;