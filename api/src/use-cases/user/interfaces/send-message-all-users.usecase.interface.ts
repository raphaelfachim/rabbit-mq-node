import { HttpResponse } from "../../../infra/http";

export interface ISendMessageAllUsersUseCase {
    execute(): Promise<HttpResponse>;
}