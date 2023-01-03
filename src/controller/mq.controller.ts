import { Request, Response } from "express";
import { User } from "../domain/user";

export class MQController {

    constructor() { }

    mqHelloWorld = (req: Request, res: Response) => {
        res.send( { message : "Hello World from MQ controller"} )
    }

    mqReceiveUser = (req: Request, res: Response) => {
        var user: User = req.body;
        console.log(user);
        res.sendStatus(200);
    }

}