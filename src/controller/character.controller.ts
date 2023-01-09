import { CharacterHttpInputTO } from "../domain/to/character";
import { HttpResponse } from "../infra/http";
import { inversifyContainer, TYPES } from "../infra/inversify";
import { ICharacterRepository, IUserRepository } from "../infra/repositories/interfaces";
import { CreateCharacterUseCase, FindAllCharactersUseCase, FindCharacterByUserUseCase } from "../use-cases/character";

export class CharacterController {

    
    constructor( ) { }
    
    createCharacter(dto: CharacterHttpInputTO): Promise<HttpResponse> {
        return new CreateCharacterUseCase
        (
            inversifyContainer.get<IUserRepository>(TYPES.IUserRepository),
            inversifyContainer.get<ICharacterRepository>(TYPES.ICharacterRepository)
            )
            .execute(dto);
        }

        findAll(): Promise<HttpResponse> {
            return new FindAllCharactersUseCase(inversifyContainer.get<ICharacterRepository>(TYPES.ICharacterRepository)).execute();
        }
    
        findCharacterByUser(id_usuario: number): Promise<HttpResponse> {
            return new FindCharacterByUserUseCase(inversifyContainer.get<IUserRepository>(TYPES.IUserRepository)).execute(id_usuario);
        }
    }
