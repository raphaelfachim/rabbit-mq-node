import { HttpResponse } from "./http-response";

export class HttpErrorResponse implements HttpResponse {
    statusCode: number = 500;
    body: any = {};

    constructor(message?: string){
        if(message) this.body = { message }
    }
}