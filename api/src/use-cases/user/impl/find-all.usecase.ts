import { inject } from "inversify";
import { parse } from "../../../domain/parser/user/http-out.parser";
import { UserHttpOutputTO } from "../../../domain/to/user";
import { HttpErrorResponse, HttpResponse, HttpSuccessResponse } from "../../../infra/http";
import { TYPES } from "../../../infra/inversify";
import { IUserRepository } from "../../../infra/repositories/interfaces";
import { IFindAllUsersUseCase } from "../interfaces/find-all.usecase.interface";

export class FindAllUsersUseCase implements IFindAllUsersUseCase {

    private _userRepository: IUserRepository;

    constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository){
        this._userRepository = userRepository;
    }

    async execute(): Promise<HttpResponse> {
        try {
            const users = await this._userRepository.findAll()
            var dtos: UserHttpOutputTO[] = [];
            for(let user of users){
                dtos.push(parse(user))
            }
            return new HttpSuccessResponse(dtos);
        } catch(ex) {
            return new HttpErrorResponse(ex.message);
        }
    }

}