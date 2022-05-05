import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import auth from "@config/auth";

interface ITokenPayload {
    iat: number,
    exp: number,
    sub: string
}

export default function isAuthenticade(
    request: Request,
    response: Response,
    next: NextFunction
) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("JWT token is missing!");
    }

    const [type, token] = authHeader.split(" ");

    try {

        const decodeToken = verify(token, auth.jwt.secret) as ITokenPayload;
        const { sub } = decodeToken;
        
        request.user ={
            id: sub
        }

        next();

    } catch (error) {
        throw new AppError("JWT Token invalid");
    }

}