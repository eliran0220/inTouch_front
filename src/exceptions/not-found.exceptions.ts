import { HttpException } from './http.exception';
export class NotFoundException extends HttpException {
    constructor(public message: string, public statusCode: number = 404) {
        super(message, statusCode);
    }
}