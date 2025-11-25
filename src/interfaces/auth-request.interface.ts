import { Request } from 'express';

export interface IAuthRequest extends Request {
    user: {
        userId: number;
        email: string;
    };
}
