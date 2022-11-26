import jwt from 'jsonwebtoken';
import * as process from 'process';
import {Request,Response,NextFunction} from 'express';
import { IErrorResponse } from '../types/response.types';
import { BAD_REQUEST_ERRORS, STATUS_CODES } from '../utilities/constants.utilities';
import { GeneralException } from '../exceptions/general.exceptions';

const verifyToken = async (req : Request, res : Response, next : NextFunction) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        const response : IErrorResponse = {
            status : 403,
            message : 'Access denied, please login',
            stack : ''
        }
        res.json(response).status(response.status);
        next();
    }
    try {
        const TOKEN_KEY = process.env.TOKEN_KEY;
        if (!TOKEN_KEY) throw new GeneralException(BAD_REQUEST_ERRORS.TOKEN_ERROR,STATUS_CODES.GENERAL_ERROR);
        const result = await jwt.verify(token as string,TOKEN_KEY);
        next();
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }
};

export default verifyToken;