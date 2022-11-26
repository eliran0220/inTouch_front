import {Express,Request,Response,NextFunction,RequestHandler} from 'express';
import user_routes from '../routes/user.routes';
import posts_routes from '../routes/posts.routes'
import UserController from '../controllers/users.controller';
import PostsController from '../controllers/posts.controller';
import * as utilities from '../utilities/common.utils';
import { IResponse, ISuccessResponse } from '../types/response.types';
import AsyncReqHandler from '../types/catcher.types';
import bcrypt from 'bcrypt';
import {GEN_SALT,STATUS_CODES,BAD_REQUEST_ERRORS} from '../utilities/constants.utilities';
import { sign, SignOptions } from 'jsonwebtoken';
import * as process from "process";
import {GeneralException} from '../exceptions/general.exceptions';
export const routes = [...user_routes,...posts_routes];

export const controllersMapping = {
    "UserController" : UserController,
    "PostsController" : PostsController
};


export const routeBuilder = (app : Express,route : Route) : void => {
    const {method, url, action, controller,middlewares} = route;
    const Controller = utilities.controllersMapping[controller];
    middlewares ? app.route(url)[method](...middlewares,errorWrapper(Controller[action])) : app.route(url)[method](errorWrapper(Controller[action]));
}


export default function errorWrapper(routingFunc: AsyncReqHandler | RequestHandler):AsyncReqHandler {
    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            await routingFunc(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}

export const hashUserPassword = async (password : string) => {
    let hashed_password : string = '';
    try{
        const salt = await bcrypt.genSalt(GEN_SALT);
        hashed_password = await bcrypt.hash(password,salt);
    } catch (err) {
        throw err;
    }
    return hashed_password;
}

export const generateJwt = (email : string, password : string) =>{
    try {
        const payload = {
            email: email,
            password: password,
        };
        const TOKEN_KEY = process.env.TOKEN_KEY;
        const signInOptions: SignOptions = {
            algorithm: 'HS256',
            expiresIn: '5m'
        };
        if (TOKEN_KEY) return sign(payload,TOKEN_KEY,signInOptions)
    } catch(err) {
        throw new GeneralException(BAD_REQUEST_ERRORS.TOKEN_ERROR,STATUS_CODES.GENERAL_ERROR)
    }

}

                                


