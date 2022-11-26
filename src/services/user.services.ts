import {IUser} from '../types/request.types';
import {IUserDto} from '../types/dto.types'
import * as process from 'process'
import * as db_service from './db.user.services';
import moment from 'moment';
import { NotFoundException } from '../exceptions/not-found.exceptions';
import {validateEmail, validateUser,validatePassword} from '../validator/user.validator';
import { ValidationException } from '../exceptions/validation.exception';
import {STATUS_CODES,VALDIATION_ERRORS,BAD_REQUEST_ERRORS} from '../utilities/constants.utilities';
import { hashUserPassword, generateJwt } from '../utilities/common.utils';
import { GeneralException } from '../exceptions/general.exceptions';
import {VerifyOptions,verify} from 'jsonwebtoken';
import bcrypt from 'bcrypt';
class UserService {
    async createUser(user : IUser) {
        validateUser(user);
        const user_in_db = await db_service.getUser(user.email);
        if (user_in_db) throw new GeneralException((`User ${user.email}${BAD_REQUEST_ERRORS.USER_FOUND}`),STATUS_CODES.BAD_REQUEST);
        user.password = await hashUserPassword(user.password);
        const token = generateJwt(user.email,user.password)
        if (!token) throw new GeneralException(BAD_REQUEST_ERRORS.TOKEN_ERROR,STATUS_CODES.BAD_REQUEST);
        const new_user : IUserDto = {
            ...user,
            created_at : moment().format("DD/MM/YYYY"),
        };
        const created_user = await db_service.createUser(new_user);
        await db_service.saveUserLoginToken(new_user.email,token);
        return created_user;
    }
    
    async getUser(email : string) {
        if (!validateEmail(email)) throw new ValidationException(VALDIATION_ERRORS.INVALID_EMAIL,STATUS_CODES.BAD_REQUEST);
        const user = await db_service.getUser(email);
        if (user) return user;
        throw new NotFoundException(`${email}${BAD_REQUEST_ERRORS.USER_N0T_FOUND}`,STATUS_CODES.BAD_REQUEST);
    }

    async verifyToken(token : string) {
        const TOKEN_KEY = process.env.TOKEN_KEY;
        if (!TOKEN_KEY) throw new GeneralException(BAD_REQUEST_ERRORS.TOKEN_ERROR,STATUS_CODES.GENERAL_ERROR);
        const verifyOptions: VerifyOptions = {
            algorithms: ['RS256'],
        };
        try {
            const result = await verify(token,TOKEN_KEY,verifyOptions);
            return result;
        } catch (err) {
            throw new GeneralException(BAD_REQUEST_ERRORS.TOKEN_ERROR,STATUS_CODES.BAD_REQUEST)
        }
    }
    
    async login(email : string , password : string){
        validatePassword(password);
        const user : IUserDto = await this.getUser(email) as IUserDto;
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) throw new ValidationException(`${VALDIATION_ERRORS.PASSWORD_DOESNT_MATCH}${user.email}`,STATUS_CODES.BAD_REQUEST);
        const token = generateJwt(user.email,user.password)
        if (!token) throw new GeneralException(BAD_REQUEST_ERRORS.TOKEN_ERROR,STATUS_CODES.BAD_REQUEST);
        await db_service.saveUserLoginToken(user.email,token);
        return token;
    }
}

const userService = new UserService();
export default userService;