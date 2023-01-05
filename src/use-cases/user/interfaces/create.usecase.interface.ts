import { UserHttpInputTO } from "../../../domain/to/user";
import { HttpResponse } from "../../../infra/http";

export interface ICreateUserUseCase {
    execute(dto: UserHttpInputTO): Promise<HttpResponse>;
}