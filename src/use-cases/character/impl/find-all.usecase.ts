import { inject } from "inversify";
import { Character } from "../../../domain";
import { parse } from "../../../domain/parser/character/http-out.parser";
import { CharacterHttpOutputTO } from "../../../domain/to/character";
import { HttpErrorResponse, HttpResponse, HttpSuccessResponse } from "../../../infra/http";
import { TYPES } from "../../../infra/inversify";
import { ICharacterRepository } from "../../../infra/repositories/interfaces";
import { IFindAllCharactersUseCase } from "../interfaces/find-all.usecase.interface";

export class FindAllCharactersUseCase implements IFindAllCharactersUseCase {

    private _characterRepository: ICharacterRepository;

    constructor(@inject(TYPES.ICharacterRepository) characterRepository: ICharacterRepository) { 
        this._characterRepository = characterRepository;
    }

    async execute(): Promise<HttpResponse> {
        try {
            var chars: Character[] = await this._characterRepository.findAll();
            var dtos: CharacterHttpOutputTO[] = [];
            chars.forEach((char) => dtos.push(parse(char)))
            
            return new HttpSuccessResponse(dtos);
        } catch(ex) {
            return new HttpErrorResponse(ex.message);
        }
    }
    
}