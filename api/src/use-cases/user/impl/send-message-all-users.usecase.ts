import { inject } from "inversify";
import { User } from "../../../domain";
import { HttpResponse, HttpErrorResponse, HttpSuccessResponse } from "../../../infra/http";
import { TYPES } from "../../../infra/inversify";
import { MQService } from "../../../infra/mq/interfaces";
import { UserTemplate } from "../../../infra/mq/templates";
import { MQConcat } from "../../../infra/mq/tools";
import { IUserRepository } from "../../../infra/repositories/interfaces";
import { mqservice, rabbitMQChannel } from "../../../messaging";
import { ISendMessageAllUsersUseCase } from "../interfaces/send-message-all-users.usecase.interface";

export class SendMessageAllUsersUseCase implements ISendMessageAllUsersUseCase {

    private _userRepository: IUserRepository;

    constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
        this._userRepository = userRepository;
    }

    async execute(): Promise<HttpResponse> {
        try {
            const users: User[] = await this._userRepository.findAll();
            const messenger: MQService = mqservice;

            users.forEach((user) => {
                var message = MQConcat.execute(user, new UserTemplate());
                messenger.sendMessage(rabbitMQChannel, "hello", message);
            });

            return new HttpSuccessResponse({message : `${users.length} usuário(s) enviado(s).`})
        } catch(ex) {
            return new HttpErrorResponse(ex.message);
        }
    }

}