import { inject } from "inversify";
import { User } from "../../../domain";
import { HttpErrorResponse, HttpResponse, HttpSuccessResponse } from "../../../infra/http";
import { TYPES } from "../../../infra/inversify";
import { IUserRepository } from "../../../infra/repositories/interfaces";
import { ICreateUserUseCase } from "../interfaces/create.usecase.interface";

export class CreateUserUseCase implements ICreateUserUseCase{

    private _userRepository: IUserRepository;

    constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) { 
        this._userRepository = userRepository;
    }

    async execute(user: User): Promise<HttpResponse> {
        try {
            const newUser = await this._userRepository.create(user);
            return new HttpSuccessResponse(newUser);  
        } catch(ex) {
            return new HttpErrorResponse(ex.message);
        }
    }

}