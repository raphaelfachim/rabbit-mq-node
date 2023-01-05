import { CharacterHttpInputTO } from "../domain/to/character";
import { HttpResponse } from "../infra/http";
import { inversifyContainer, TYPES } from "../infra/inversify";
import { ICharacterRepository } from "../infra/repositories/interfaces";
import { CreateCharacterUseCase } from "../use-cases/character/impl/create.usecase";

export class CharacterController {
    
    constructor( ) { }

    createCharacter(dto: CharacterHttpInputTO): Promise<HttpResponse> {
        return new CreateCharacterUseCase(inversifyContainer.get<ICharacterRepository>(TYPES.ICharacterRepository)).execute(dto);
    }
}