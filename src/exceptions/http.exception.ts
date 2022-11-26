import { ErrorAcumalator } from "../types/common.types";

export class HttpException extends Error {
    constructor(public message: string, public statusCode: number) {
        super(message);
    }
}