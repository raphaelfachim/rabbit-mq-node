import { HttpResponse } from "../../../infra/http";

export interface IFindAllCharactersUseCase {
    execute(): Promise<HttpResponse>;
}