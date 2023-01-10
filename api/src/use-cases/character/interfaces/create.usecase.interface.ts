import { CharacterHttpInputTO } from "../../../domain/to/character";
import { HttpResponse } from "../../../infra/http";

export interface ICreateCharacterUseCase {
    execute(dto: CharacterHttpInputTO): Promise<HttpResponse>;
}