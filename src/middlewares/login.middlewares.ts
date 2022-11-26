import { NextFunction, Request, Response } from 'express';
const loginMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    console.log("this is only happening in users!");
    next();
};

export default loginMiddleware;