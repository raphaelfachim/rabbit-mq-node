import { HttpResponse } from "../../../infra/http";

export interface IFindCharacterByUserUseCase {
    execute(id_usuario: number): Promise<HttpResponse>;
}