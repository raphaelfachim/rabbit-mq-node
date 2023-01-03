import express from "express";
import { Router} from "express";
import { MQController } from "./controller/mq.controller";

const app = express();
const route = Router();

app.use(express.json());

var mqController = new MQController();

route.get("/",  mqController.helloWorld);
route.post("/", mqController.receiveUser);
route.get("/all", mqController.listAllUsers);
route.get("/send", mqController.sendMessageAllUsers);

app.use(route);

app.listen(3333, () => "Server listening port 3333");