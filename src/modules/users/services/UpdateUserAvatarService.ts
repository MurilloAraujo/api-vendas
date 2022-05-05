import AppError from "@shared/errors/AppError";
import { MysqlDataSource } from "@shared/typeorm"
import User from "../typeorm/entities/User";
import UsersRepository from "../typeorm/repositories/UsersRepositories";
import path from "path";
import upload from "@config/upload";
import fs from "fs";

interface IRequest {
    user_id: string,
    avatarFilename: string
}

class UpdateUserAvatarService {

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {

        const UsersRepositories = MysqlDataSource.manager.withRepository(UsersRepository);
        const user = await UsersRepositories.findById(user_id);
        
        if (!user) {
            throw new AppError("User not found");
        }

        if (user.avatar) {

            const userAvatarFilePath = path.join(upload.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath).catch(error => error)

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath).catch(error => error)
            }
        }

        user.avatar = avatarFilename;

        return await UsersRepositories.save(user);

    }
}

export default UpdateUserAvatarService;