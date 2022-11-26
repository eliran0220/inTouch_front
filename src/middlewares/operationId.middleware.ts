import { NextFunction, Request, Response } from 'express';
import {v4} from 'uuid';

export const addIDToRequest = (req: Request, res: Response, next: NextFunction): void => {
    const uuId = v4()
    req.operation_id = uuId;
    next();
}



