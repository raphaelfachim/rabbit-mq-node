import { Request, Response } from "express";
import { User } from "../domain/user";
import { UserRepositoryMemory } from "../infra/repositories/implementations/mem/user.respository";
import { IUserRepository } from "../infra/repositories/interfaces";

export class MQController {

    private readonly userRepository: IUserRepository;

    constructor() { 
        this.userRepository = new UserRepositoryMemory();    
    }

    mqHelloWorld = (req: Request, res: Response) => {
        res.send( { message : "Hello World from MQ controller"} )
    }

    mqReceiveUser = (req: Request, res: Response) => {
        var user: User = req.body;
        console.log(user);
        this.userRepository.create(user);
        res.sendStatus(200);
    }

    mqListAllUsers = (req: Request, res: Response) => {
        this.userRepository.findAll().then((users) => {
            res.send(JSON.stringify(users));
        }).catch((err) => {
            res.sendStatus(500);
        })
    }
}