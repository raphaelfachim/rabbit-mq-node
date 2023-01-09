import { HttpResponse } from "../../../infra/http";

export interface IDeleteCharacterUseCase {
    execute(dto: any): Promise<HttpResponse>;
}