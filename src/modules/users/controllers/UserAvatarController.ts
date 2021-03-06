import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UserAvatarController {

    public async update(request: Request, response: Response): Promise<Response | null> {
        const updateAvatar = new UpdateUserAvatarService()
        const user  = updateAvatar.execute({
            user_id: request.user.id,
            avatarFilename: `${request.file?.filename}`
        });
        

        return response.json({
            "message": "arquivo enviado com sucesso"
        })
    }
}