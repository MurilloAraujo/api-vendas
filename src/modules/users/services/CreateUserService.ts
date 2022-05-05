import AppError from "@shared/errors/AppError";
import { MysqlDataSource } from "@shared/typeorm"
import IRequest from "../interfaces/IRquest.interface";
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepositories";
import validator from "validator";
import { number } from "joi";
import { hash } from "bcryptjs";

class CreateUserService {

    public async execute({ name, email, password }: IRequest): Promise<User | null> 
    {

        const UsersRepositories = MysqlDataSource.manager.withRepository(UsersRepository);
        const emailExists = await UsersRepositories.findByEmail(email);

        if (validator.isStrongPassword(password, { minLength: 8 })) {
            throw new AppError("Password min length 9 characters", 400);
        }

        if (emailExists) {
            throw new AppError("Email address already user", 400);
        }

        if (!validator.isEmail(email)) {
            throw new AppError("Email invalid", 400);
        }

        const hashedPassword = await hash(password, 8)

        const users = UsersRepositories.create({
            name,
            email,
            password: hashedPassword
        })
        return await UsersRepositories.save(users);

    }
}

export default CreateUserService;