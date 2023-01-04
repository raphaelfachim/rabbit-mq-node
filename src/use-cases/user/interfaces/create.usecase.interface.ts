import { User } from "../../../domain";
import { HttpResponse } from "../../../infra/http";

export interface ICreateUserUseCase {
    execute(user: User): Promise<HttpResponse>;
}