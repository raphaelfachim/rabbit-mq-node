import { inject } from "inversify";
import { parse as parseHttpInput } from "../../../domain/parser/character/http-in.parser";
import { parse as parseHttpOutput } from "../../../domain/parser/character/http-out.parser";
import { CharacterHttpInputTO } from "../../../domain/to/character";
import { HttpErrorResponse, HttpResponse, HttpSuccessResponse } from "../../../infra/http";
import { TYPES } from "../../../infra/inversify";
import { ICharacterRepository, IUserRepository } from "../../../infra/repositories/interfaces";
import { ICreateCharacterUseCase } from "../interfaces/create.usecase.interface";


export class CreateCharacterUseCase implements ICreateCharacterUseCase {

    private _userRepository: IUserRepository;
    private _characterRepository: ICharacterRepository;

    constructor(
        @inject(TYPES.IUserRepository) userRepository: IUserRepository,
        @inject(TYPES.ICharacterRepository) characterRepository: ICharacterRepository) 
    {
        this._userRepository = userRepository;
        this._characterRepository = characterRepository;
    }

    async execute(dto: CharacterHttpInputTO): Promise<HttpResponse> {
        try {
            const user = await this._userRepository.findById(dto.id_usuario);
            user.character = await this._characterRepository.save(parseHttpInput(dto));
            await this._userRepository.save(user);

            return new HttpSuccessResponse(parseHttpOutput(user.character));
        } catch(ex) {
            return new HttpErrorResponse(ex.message);
        }
    }

}