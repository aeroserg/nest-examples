import { Request } from 'express';

export interface JwtRequestUser {
    userId: number;
    email?: string;
}

export type RequestWithUser = Request & { user: JwtRequestUser };
