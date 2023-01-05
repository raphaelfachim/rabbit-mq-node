import express from "express";
import { Router} from "express";
import { CharacterController } from "./controller";
import { UserController } from "./controller/user.controller";
import { expressAdapter } from "./infra/http";

import { AppDataSource } from "./infra/repositories/implementations/db/datasource";

const ds = AppDataSource;

ds.initialize()
    .then((res) => {
        console.log("Iniciando conexão com o banco de dados");
    })
    .catch((err) => {
        console.error("Erro ao conectar com o banco de dados");
        console.error(err.message);
    })

const app = express();
const route = Router();

app.use(express.json());

var userController = new UserController();
var characterController = new CharacterController();

route.get("/",  expressAdapter(userController.helloWorld));
route.get("/all", expressAdapter(userController.findAllUsers));
route.get("/send", expressAdapter(userController.sendMessageAllUsers));

route.post("/", expressAdapter(userController.createUser));
route.post("/char/new", expressAdapter(characterController.createCharacter));
route.post("/:id/params", expressAdapter(userController.receiveParameters));

app.use(route);

app.listen(3333, () => "Server listening port 3333");