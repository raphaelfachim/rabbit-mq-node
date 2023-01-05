import { inject } from "inversify";
import { parse } from "../../../domain/parser/user/http-in.parser";
import { parse as parseOutput} from "../../../domain/parser/user/http-out.parser";
import { UserHttpInputTO } from "../../../domain/to/user";
import { HttpErrorResponse, HttpResponse, HttpSuccessResponse } from "../../../infra/http";
import { TYPES } from "../../../infra/inversify";
import { IUserRepository } from "../../../infra/repositories/interfaces";
import { ICreateUserUseCase } from "../interfaces/create.usecase.interface";

export class CreateUserUseCase implements ICreateUserUseCase{

    private _userRepository: IUserRepository;

    constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) { 
        this._userRepository = userRepository;
    }

    async execute(dto: UserHttpInputTO): Promise<HttpResponse> {
        try {
            return new HttpSuccessResponse(parseOutput(await this._userRepository.create(parse(dto))));  
        } catch(ex) {
            return new HttpErrorResponse(ex.message);
        }
    }

}