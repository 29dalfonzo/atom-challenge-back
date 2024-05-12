import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET || 'default_secret';

export const generateToken = (data: any): string => {
    return jwt.sign(data, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    if (token) {
        token = token.split(' ')[1];
    }
    return jwt.verify(token, secret);
};


