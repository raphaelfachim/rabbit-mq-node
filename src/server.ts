import express from "express";
import { Router} from "express";
import { UserController } from "./controller/user.controller";
import { expressAdapter } from "./infra/http";
import { inversifyContainer, TYPES } from "./infra/inversify";
import { IUserRepository } from "./infra/repositories/interfaces";

const app = express();
const route = Router();

app.use(express.json());

var userController = new UserController();

route.get("/",  expressAdapter(userController.helloWorld));
route.get("/all", expressAdapter(userController.findAllUsers));
route.get("/send", expressAdapter(userController.sendMessageAllUsers));

route.post("/", expressAdapter(userController.createUser));
route.post("/:id/params", expressAdapter(userController.receiveParameters));

app.use(route);

app.listen(3333, () => "Server listening port 3333");