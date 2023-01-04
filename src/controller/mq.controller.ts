import { inject } from "inversify/lib/annotation/inject";
import { User } from "../domain/user";
import { HttpResponse, HTTP_INTERNAL_ERROR, HTTP_OK } from "../infra/http";
import { TYPES } from "../infra/inversify";
import { MQService } from "../infra/mq/interfaces";
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

    helloWorld = async (): Promise<HttpResponse> => {
        return {
            body: { message : "Hello World from adapter!" },
            statusCode: HTTP_OK
        }
    }

    createUser = async (user: User): Promise<HttpResponse> => {
        try {
            var newUser = await this.userRepository.create(user);
            return {
                statusCode: HTTP_OK,
                body: newUser
            }
        } catch (ex) {
            return {
                statusCode: HTTP_INTERNAL_ERROR,
                body: { error_message : ex.message}
            }
        }
    }

    listAllUsers = async (): Promise<HttpResponse> => {
        try {
            var users: User[] = 
                await this.userRepository.findAll();
            
            return {
                statusCode: HTTP_OK,
                body: users
            }
        } catch (ex) {
            return {
                statusCode: HTTP_INTERNAL_ERROR,
                body: users
            }
        }
    }

    sendMessageAllUsers = async (): Promise<HttpResponse> => {
        var users: User[];
        try {
            users = await this.userRepository.findAll();

            for(var user of users){
                // formata o usuario de acordo com o template
                const message = MQConcat.execute(user, new UserTemplate());
                // envia a string dos dados via mensagem
                this.mqService.sendMessage(rabbitMQChannel, "hello", message);
            }
            return {
                statusCode: HTTP_OK,
                body: { status :  `${users.length} usuário(s) enviado(s)`}
            }
        } catch (ex) {
            return {
                statusCode: HTTP_INTERNAL_ERROR,
                body: { error_message : ex.message }
            }
        }
    }

    receiveParameters = async (params: any): Promise<HttpResponse> => {
        console.log("params : ", params);
        return {
            statusCode: HTTP_OK,
            body: { }
        }
    }

}