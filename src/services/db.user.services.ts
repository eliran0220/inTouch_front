import {IUserDto} from '../types/dto.types';
import { DbException } from '../exceptions/db.exception';
import User from '../odels/user';
import UserToken from '../odels/user_tokens';

import { IUser } from '../types/request.types';
export const createUser = async (user : IUserDto) : Promise<IUserDto> => {
    try {
        const new_user = new User({
            email : user.email,
            first_name : user.first_name,
            last_name: user.last_name,
            password: user.password,
            created_at: user.created_at
        })
        //const result = (await db.query(sql_query,[...params])).rows[0] as IUserDto;
        await new_user.save();
        console.log(new_user);
        return new_user;
    } catch (err) {
        console.log(err)
        throw new DbException("Database error occured",500);
    }
}

export const getUser = async (email : string) : Promise<IUser | null> => {
    try {
        const user = await User.findOne({email : email});
        return user;
    } catch (err) {
        console.log(err)
        console.log(err)
        throw new DbException("Database error occured",500);
    }
}

export const saveUserLoginToken = async (email : string ,token : string) : Promise<void> => {
    try {
        const user_token = await UserToken.findOne({email : email});
        if (!user_token) {
            const new_token = new UserToken({email: email, token: token})
            await new_token.save();
        }
        return;
    }
    catch (err) {
        console.log(err)
        throw err;
    }
}