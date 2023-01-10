import { inject } from "inversify";
import { CHAR_MES02 } from "../../../infra/error-messages/usecases";
import { HttpErrorResponse, HttpResponse, HttpSuccessResponse } from "../../../infra/http";
import { TYPES } from "../../../infra/inversify";
import { IUserRepository } from "../../../infra/repositories/interfaces";
import { IDeleteCharacterUseCase } from "../interfaces/delete.usecase.interface";

export class DeleteCharacterUseCase implements IDeleteCharacterUseCase {

    private _userRepository: IUserRepository;

    constructor(
        @inject(TYPES.IUserRepository) userRepository: IUserRepository
        ) {
        this._userRepository = userRepository;
    }

    async execute(dto: any): Promise<HttpResponse> {
        try {
            var user = await this._userRepository.findById(dto.id_usuario);
            if(!user.character) throw Error(CHAR_MES02);

            user = await this._userRepository.deleteUsersCharacter(user);
            return new HttpSuccessResponse(user)

        } catch(ex) {
            return new HttpErrorResponse(ex.message);
        }
    }

}