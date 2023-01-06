import { Request, Response } from "express";
import { HttpResponse } from "./http-response";

export const expressAdapter = (handle: (data?: any) => Promise<HttpResponse>) => {
    return async (req: Request, res: Response) => {
        const content = {
            ... (req.body || {}),
            ... (req.params || {}),
            ... (req.query || {})
        };

        let response: HttpResponse = {
            statusCode: 200,
            body: {}
        };

        response = await handle(content);
        
        // if(response.statusCode >= 200 && response.statusCode < 299){
        //     res.status(response.statusCode).json(response.body);
        // } else {
            //     res.status(response.statusCode).json(response.body);
            // }
        res.status(response.statusCode).json(response.body);

    }
}