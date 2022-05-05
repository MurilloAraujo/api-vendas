import { Request, Response } from "express";
import CreateUserService from "../services/CreateUserService";
import ListUsersService from "../services/ListUserService";

export default class UserController {

    public async index(request: Request, response: Response): Promise<Response> {

        const listUsers = new ListUsersService();
        const users = await listUsers.execute();
        return response.status(200).json({ users })
    }

    public async create(request: Request, response: Response): Promise<Response> {

        const { name, email, password } = request.body;
        const userService = new CreateUserService();
        const createUser = await userService.execute({ name, email, password })

        return response.status(200).json({ createUser });

    }
}