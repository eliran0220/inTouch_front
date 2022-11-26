import { ErrorAcumalator } from '../types/common.types';
import { HttpException } from './http.exception';
export class ValidationException extends HttpException {
    constructor(public message: string, public statusCode: number = 400) {
        super(message, statusCode);
    }
}