import express from "express";
import { Router} from "express";
import { MQController } from "./controller/mq.controller";
import { inversifyContainer, TYPES } from "./infra/inversify";
import { IUserRepository } from "./infra/repositories/interfaces";

const app = express();
const route = Router();

app.use(express.json());

var mqController = new MQController(inversifyContainer.get<IUserRepository>(TYPES.IUserRepository));

route.get("/",  mqController.helloWorld);
route.get("/all", mqController.listAllUsers);
route.get("/send", mqController.sendMessageAllUsers);

route.post("/", mqController.receiveUser);

app.use(route);

app.listen(3333, () => "Server listening port 3333");