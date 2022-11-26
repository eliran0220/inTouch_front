import {Request,Response,RequestHandler,NextFunction} from 'express';
type AsyncReqHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export default AsyncReqHandler;