import { Request, Response } from "express";
// import { mqApp } from "../mqapp";
import { User } from "../domain/user";
import { HTTP_INTERNAL_ERROR, HTTP_OK } from "../infra/http";
import { UserTemplate } from "../infra/mq/templates";
import { MQConcat } from "../infra/mq/tools";
import { UserRepositoryMemory } from "../infra/repositories/implementations/mem/user.respository";
import { IUserRepository } from "../infra/repositories/interfaces";
import { MQConfig, RabbitMQAdapter } from "../mqapp";

export class MQController {

    private readonly userRepository: IUserRepository;

    constructor() { 
        this.userRepository = new UserRepositoryMemory();    
    }

    helloWorld = (req: Request, res: Response) => {
        res.send( { message : "Hello World from MQ controller"} )
    }

    receiveUser = (req: Request, res: Response) => {
        var user: User = req.body;
        console.log(user);
        this.userRepository.create(user);
        res.sendStatus(HTTP_OK);
    }

    listAllUsers = (req: Request, res: Response) => {
        this.userRepository.findAll().then((users) => {
            res.send(JSON.stringify(users));
        }).catch((err) => {
            res.sendStatus(HTTP_INTERNAL_ERROR);
        })
    }

    sendMessageAllUsers = async (req: Request, res: Response) => {
        var users: User[];
        try {
            users = await this.userRepository.findAll();

            for(var user of users){
                // formata o usuario de acordo com o template
                const message = MQConcat.execute(user, new UserTemplate());
                // envia a string dos dados via mensagem
                var mqApp = new RabbitMQAdapter();
                await mqApp.createConnection(MQConfig.url);
                await mqApp.sendMessage("hello", message)
                
            }

            res.sendStatus(HTTP_OK);
        } catch (ex) {
            res.sendStatus(HTTP_INTERNAL_ERROR);
        }

    }
}