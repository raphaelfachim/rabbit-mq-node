import { inject } from "inversify";
import { parse as parseHttpInput } from "../../../domain/parser/character/http-in.parser";
import { parse as parseHttpOutput } from "../../../domain/parser/character/http-out.parser";
import { CharacterHttpInputTO } from "../../../domain/to/character";
import { HttpErrorResponse, HttpResponse, HttpSuccessResponse } from "../../../infra/http";
import { TYPES } from "../../../infra/inversify";
import { ICharacterRepository } from "../../../infra/repositories/interfaces";
import { ICreateCharacterUseCase } from "../interfaces/create.usecase.interface";


export class CreateCharacterUseCase implements ICreateCharacterUseCase {

    private _characterRepository: ICharacterRepository;

    constructor(@inject(TYPES.ICharacterRepository) characterRepository: ICharacterRepository) {
        this._characterRepository = characterRepository;
     }

    async execute(dto: CharacterHttpInputTO): Promise<HttpResponse> {
        try {
            const newChar = await this._characterRepository.save(parseHttpInput(dto))
            return new HttpSuccessResponse(parseHttpOutput(newChar));
        } catch(ex) {
            return new HttpErrorResponse(ex.message);
        }
    }

}