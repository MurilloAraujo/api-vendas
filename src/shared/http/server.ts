import "reflect-metadata"
import "@shared/typeorm";
import AppError from "@shared/errors/AppError";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import cors from "cors";
import { errors } from "celebrate";
import routes from "./routes";
import upload from "@config/upload";

const app = express();
app.use(cors());
app.use(express.json())
app.use("/files", express.static(upload.directory))
app.use(routes);
app.use(errors())

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {

    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        })

    }
    return response.status(500).json({
        status: "error",
        message: "Internar server error"
    })

});

app.listen(3333, () => console.log("listen 3333"));