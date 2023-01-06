import { DataSource } from "typeorm";
import { Character, User } from "../../../../../domain";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3307,
    username: "root",
    password: "@Root123",
    database: "squid",
    synchronize: false,
    logging: false,
    entities: [ Character, User],
    subscribers: [],
    migrations: []
})