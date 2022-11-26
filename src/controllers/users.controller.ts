import {Response, Request} from "express";
import {IUser} from '../types/request.types';
import {IUserDto} from '../types/dto.types';

import UserService from '../services/user.services';
import {IErrorResponse, ISuccessResponse } from "../types/response.types";
import {SUCCESS_MESSAGES} from '../utilities/constants.utilities'; 
class UserController {
    constructor() {
        console.log('Created instance of UserController')
    }

    async getUser(req: Request, res: Response) {
        const id = req.params.id;
        const user = await UserService.getUser(id) as IUserDto;
        const response : ISuccessResponse = {
            status:200,
            message : `${user.email}${SUCCESS_MESSAGES.GET_USER}`,
            data : user
        };
        res.status(response.status).json(response);

    }

   async createUser(req: Request, res: Response) {
        const created_user = await UserService.createUser(req.body as IUser) as IUser;
        const response : ISuccessResponse = {
            status:200,
            message : `${created_user.email}${SUCCESS_MESSAGES.USER_CREATED}`,
            data : created_user
        };
       res.status(response.status).json(response);
    }

    async deleteUser(req: Request, res: Response) {
        res.json({message:'User route delete request'})
    }

    async login(req: Request, res: Response) {
        const {email, password} = req.body;
        const token = await UserService.login(email,password);
        const response : ISuccessResponse = {
            status: 200,
            message: `${email}${SUCCESS_MESSAGES}`,
            data: token
        }
        res.status(response.status).json(response);
    }
}

export default new UserController()