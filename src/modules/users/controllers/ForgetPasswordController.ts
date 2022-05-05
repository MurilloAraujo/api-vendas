import { Request, Response } from "express";
import SendForgetPasswordEmailService from "../services/SendForgetPasswordEmailService";

export default class ForgotPasswordController {

    public async create(request: Request, response: Response): Promise<Response> {

        const { email } = request.body;

        const sendoForget = new SendForgetPasswordEmailService();

        await sendoForget.execute({ email })

        return response.status(200).json({
            message: "reset"
        })

    }
}