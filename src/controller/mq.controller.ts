import { Request, Response } from "express";
import { inject } from "inversify/lib/annotation/inject";
// import { mqApp } from "../mqapp";
import { User } from "../domain/user";
import { HTTP_INTERNAL_ERROR, HTTP_OK } from "../infra/http";
import { TYPES } from "../infra/inversify";
import MQService from "../infra/mq/interfaces/mqservice";
import { UserTemplate } from "../infra/mq/templates";
import { MQConcat } from "../infra/mq/tools";
import { IUserRepository } from "../infra/repositories/interfaces";
import { mqservice, rabbitMQChannel } from "../messaging";

export class MQController {

    private readonly userRepository: IUserRepository;
    private readonly mqService: MQService;

    constructor(
        @inject(TYPES.IUserRepository) userRepository: IUserRepository
        ) { 
        this.userRepository = userRepository;
        this.mqService = mqservice;
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
                console.log("Enviando mensagem com usuário");
                this.mqService.sendMessage(rabbitMQChannel, "hello", message);
            }

            res.sendStatus(HTTP_OK);
        } catch (ex) {
            res.sendStatus(HTTP_INTERNAL_ERROR);
        }

    }
}