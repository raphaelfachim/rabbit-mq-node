import { Request, Response } from "express";

export type HttpResponse = (res: Response, req: Request) => any;