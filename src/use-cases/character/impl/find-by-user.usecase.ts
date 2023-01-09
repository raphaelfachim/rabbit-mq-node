import { inject } from "inversify";
import { Character, User } from "../../../domain";
import { parse } from "../../../domain/parser/character/http-out.parser";
import { HttpErrorResponse, HttpResponse, HttpSuccessResponse } from "../../../infra/http";
import { TYPES } from "../../../infra/inversify";
import { IUserRepository } from "../../../infra/repositories/interfaces";
import { IFindCharacterByUserUseCase } from "../interfaces/find-by-user.usecase.interface";

export class FindCharacterByUserUseCase implements IFindCharacterByUserUseCase {

    private _userRepository: IUserRepository;

    constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) { 
        this._userRepository = userRepository;
    }

    async execute(dto: any): Promise<HttpResponse> {
        try {
            const user: User = await this._userRepository.findById(dto.id_usuario);
            const char: Character = user.character;
            char.user = user;
            
            return new HttpSuccessResponse(parse(char));
        } catch(ex) {
            return new HttpErrorResponse(ex.message);
        }   
    }
    
}