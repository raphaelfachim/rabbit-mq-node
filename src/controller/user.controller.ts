import { User } from "../domain/user";
import { HttpResponse, HTTP_OK } from "../infra/http";
import { inversifyContainer, TYPES } from "../infra/inversify";
import { IUserRepository } from "../infra/repositories/interfaces";
import { CreateUserUseCase, FindAllUsersUseCase, SendMessageAllUsersUseCase } from "../use-cases/user";

export class UserController {
    constructor( ) { }

    helloWorld = async (): Promise<HttpResponse> => {
        return {
            body: { message : "Hello World from adapter!" },
            statusCode: HTTP_OK
        }
    }

    createUser = async (user: User): Promise<HttpResponse> => {
        return new CreateUserUseCase(inversifyContainer.get<IUserRepository>(TYPES.IUserRepository)).execute(user);
    }

    findAllUsers = async (): Promise<HttpResponse> => {
        return new FindAllUsersUseCase(inversifyContainer.get<IUserRepository>(TYPES.IUserRepository)).execute();
    }

    sendMessageAllUsers = async (): Promise<HttpResponse> => {
        return new SendMessageAllUsersUseCase(inversifyContainer.get<IUserRepository>(TYPES.IUserRepository)).execute();
    }

    receiveParameters = async (params: any): Promise<HttpResponse> => {
        console.log("params : ", params);
        return {
            statusCode: HTTP_OK,
            body: { }
        }
    }

}