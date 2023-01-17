import express from "express";
import { Router} from "express";
import { CharacterController } from "./controller";
import { UserController } from "./controller/user.controller";
import { expressAdapter } from "./infra/http";
import cors from 'cors'

import { AppDataSource } from "./infra/repositories/implementations/db/typeorm";

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
app.use(cors());

var userController = new UserController();
var characterController = new CharacterController();

// ========== misc ==========
// GET
route.get("/",  expressAdapter(userController.helloWorld));

// POST
route.post("/:id/params", expressAdapter(userController.receiveParameters));

// ========== users ==========
// GET
route.get("/users/all", expressAdapter(userController.findAllUsers));
route.get("/users/send", expressAdapter(userController.sendMessageAllUsers));

// POST
route.post("/users/new", expressAdapter(userController.createUser));

// ========== characters ==========
// GET
route.get("/:id_usuario/char", expressAdapter(characterController.findCharacterByUser));
route.get("/char/all", expressAdapter(characterController.findAll));

// POST
route.post("/:id_usuario/char/new", expressAdapter(characterController.createCharacter));

// DELETE
route.delete("/:id_usuario/char/delete", expressAdapter(characterController.delete));

app.use(route);

app.listen(3333, () => "Server listening port 3333");