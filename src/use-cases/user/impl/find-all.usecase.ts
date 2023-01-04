import { inject } from "inversify";
import { HttpResponse } from "../../../infra/http";
import { HttpErrorResponse } from "../../../infra/http/http-error-response";
import { HttpSuccessResponse } from "../../../infra/http/http-success-response";
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
            return new HttpSuccessResponse(
                await this._userRepository.findAll()
            );
        } catch(ex) {
            return new HttpErrorResponse(ex.message);
        }
    }

}