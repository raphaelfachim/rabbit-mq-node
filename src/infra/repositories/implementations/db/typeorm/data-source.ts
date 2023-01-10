import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "@Root123",
    database: "squid",
    synchronize: false,
    logging: false,
    // entities: ["src/domain/*.entity.ts"], // mudar aqui para 'dist/domain/*.entity.js' quando for rodar uma migration
    entities: ["dist/domain/*.entity.js"],
    subscribers: [],
    migrations: ["dist/infra/repositories/implementations/db/typeorm/migrations/*.js"],
})