export {};

declare global {
    namespace Express {
        interface Request {
            operation_id: string;
        }
    }
}