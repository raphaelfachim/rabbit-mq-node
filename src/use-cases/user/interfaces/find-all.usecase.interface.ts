import { HttpResponse } from "../../../infra/http";

export interface IFindAllUsersUseCase {
    execute(): Promise<HttpResponse>;
}