import { HttpResponse } from "./http-response";

export class HttpSuccessResponse implements HttpResponse {
    statusCode: number = 200;
    body: any;

    constructor(body: any){
        this.body = body;
    }
}