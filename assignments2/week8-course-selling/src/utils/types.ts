import { NextFunction, Request, Response } from "express";

export type AsyncFn = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<any>;





