import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
dotenv.config();

const secret = process.env.JWT_SECRET || 'default_secret';

export const generateToken = (data: any): string => {
    return jwt.sign(data, secret, { expiresIn: '1h' });
};

export  const decodeToken = (token: string): any => {
    return jwt.verify(token, secret);
}

export const getUserId = (BearerToken: string): string => {
    if (!BearerToken) {
        return '';
    }
    const token = BearerToken.split(' ')[1];
    const { id } = decodeToken(token);
    return id;
}


// Middleware de autenticación
export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({ message: "Unauthorized" });

    jwt.verify(token, secret, (err: any, user: any) => {
        if (err) return res.status(403).json({ message: "Forbidden" });
        next();
    });
}