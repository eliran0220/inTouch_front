import { HttpException } from './http.exception';
export class GeneralException extends HttpException {
    constructor(public message: string, public statusCode: number = 400) {
        super(message, statusCode);
    }
}