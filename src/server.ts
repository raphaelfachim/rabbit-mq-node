import express from "express";
import { Router, Request, Response } from "express";
import { MQController } from "./controller/mq.controller";

const app = express();
const route = Router();

app.use(express.json());

var mqController = new MQController();

route.get("/",  mqController.mqHelloWorld);
route.post("/", mqController.mqReceiveUser)

app.use(route);

app.listen(3333, () => "Server listening port 3333");