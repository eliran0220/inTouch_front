import { HttpException } from './http.exception';
export class DbException extends HttpException {
    constructor(public message: string, public statusCode: number = 500) {
        super(message, statusCode);
    }
}