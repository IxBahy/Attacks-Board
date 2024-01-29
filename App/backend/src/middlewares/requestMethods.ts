import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction): void => {
	// NOTE: Exclude TRACE and TRACK methods to avoid XST attacks.
	const allowedMethods = ["GET", "POST"];

	if (!allowedMethods.includes(req.method)) {
		res.status(405).send(`${req.method} not allowed.`);
	}

	next();
};
