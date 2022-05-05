import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from 'path'

dotenv.config();


export const MysqlDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: parseInt("3306"),
    username: "root",
    password: "123",
    database: "apivendas",
    synchronize: false,
    logging: false,
    entities: ["src/modules/**/typeorm/entities/*.ts"],
    subscribers: [],
    migrations: [path.resolve(__dirname, 'migrations/', '*.ts')]
})

MysqlDataSource.initialize()
