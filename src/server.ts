import express from "express";
import { Router} from "express";
import { MQController } from "./controller/mq.controller";
import { expressAdapter } from "./infra/http";
import { inversifyContainer, TYPES } from "./infra/inversify";
import { IUserRepository } from "./infra/repositories/interfaces";

const app = express();
const route = Router();

app.use(express.json());

var mqController = new MQController(inversifyContainer.get<IUserRepository>(TYPES.IUserRepository));

route.get("/",  expressAdapter(mqController.helloWorld));
route.get("/all", expressAdapter(mqController.listAllUsers));
route.get("/send", expressAdapter(mqController.sendMessageAllUsers));

route.post("/", expressAdapter(mqController.createUser));
route.post("/:id/params", expressAdapter(mqController.receiveParameters));

app.use(route);

app.listen(3333, () => "Server listening port 3333");