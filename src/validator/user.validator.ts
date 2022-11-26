import { ValidationException } from '../exceptions/validation.exception';
import { ErrorAcumalator } from '../types/common.types';
import {IUser, paramChecker} from '../types/request.types';
import {REGEX,STATUS_CODES,VALDIATION_ERRORS,MANDATORY_FIELDS} from '../utilities/constants.utilities';

export const validateUser = (user : IUser) : void => {
    checkIfparamsEmpty(user);
    let errors : ErrorAcumalator = {};
    const {password, first_name, last_name, email} = user;
    if (!validateEmail(email)) errors['Invalid email'] = VALDIATION_ERRORS.INVALID_EMAIL
    if (!validatePassword(password)) errors['Invalid password'] = VALDIATION_ERRORS.INVALID_PASSWORD
    if (Object.keys(errors).length > 0) throw new ValidationException(JSON.stringify(errors),STATUS_CODES.BAD_REQUEST);
    
}

export const checkIfparamsEmpty = (obj : paramChecker) : void  =>  {
    let errors : ErrorAcumalator = {};
    for (const key of MANDATORY_FIELDS){
        if (obj[key] === undefined || obj[key] ==='') {
            errors[key] = VALDIATION_ERRORS[`INVALID_${key.toUpperCase()}_EMPTY`];
        }
    }
    if (Object.keys(errors).length > 0) throw new ValidationException(JSON.stringify(errors),STATUS_CODES.BAD_REQUEST);
}

export const validateEmail = (email : string) : boolean =>  {
    if (!REGEX.valid_email.test(email)) return false;
    return true;
}

export const validatePassword = (password : string) : boolean => {
    if (!REGEX.valid_password.test(password)) return false;
    return true;
}
